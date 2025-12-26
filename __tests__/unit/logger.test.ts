import { sanitizeError } from '@/lib/utils/logger';

describe('sanitizeError', () => {
    it('sanitizes standard Error objects', () => {
        const error = new Error('Something went wrong');
        const sanitized = sanitizeError(error);

        expect(sanitized).toHaveProperty('message', 'Something went wrong');
        expect(sanitized).toHaveProperty('name', 'Error');
        expect(sanitized).toHaveProperty('stack');
    });

    it('sanitizes Supabase-like errors with safe fields', () => {
        const error = {
            message: 'Database error',
            code: '23505',
            details: 'Key (email)=(test@example.com) already exists.',
            hint: 'Try a different email',
            // Sensitive fields that should be stripped
            connectionString: 'postgres://user:secret@localhost:5432/db',
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            internalQuery: 'SELECT * FROM users WHERE password = ...'
        };

        const sanitized = sanitizeError(error);

        expect(sanitized).toEqual({
            message: 'Database error',
            code: '23505',
            details: 'Key (email)=(test@example.com) already exists.',
            hint: 'Try a different email'
        });

        expect(sanitized).not.toHaveProperty('connectionString');
        expect(sanitized).not.toHaveProperty('apiKey');
        expect(sanitized).not.toHaveProperty('internalQuery');
    });

    it('handles string errors', () => {
        const sanitized = sanitizeError('Simple error string');
        expect(sanitized).toEqual({ message: 'Simple error string' });
    });

    it('handles unknown objects', () => {
        const error = { unknownProp: 'value', anotherSecret: '123' };
        const sanitized = sanitizeError(error);

        // Should not pass through unknown props
        expect(sanitized).not.toHaveProperty('unknownProp');
        expect(sanitized).not.toHaveProperty('anotherSecret');
        // fallback
        expect(sanitized).toEqual({ message: 'Unknown error object', originalType: 'object' });
    });

    it('handles null and undefined', () => {
        expect(sanitizeError(null)).toEqual({ message: 'null' });
        expect(sanitizeError(undefined)).toEqual({ message: 'undefined' });
    });
});
