/**
 * Sanitizes error objects to prevent leakage of sensitive information (secrets, keys, PII) in logs.
 *
 * @param error - The error object or unknown value
 * @returns A sanitized error object with only safe fields
 */
export function sanitizeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
        // Standard Error object
        const sanitized: Record<string, unknown> = {
            name: error.name,
            message: error.message,
            stack: error.stack, // Stack trace might contain paths, but usually safe in server logs. Consider stripping if paranoid.
        };

        // Handle Supabase/Postgres specific error fields safely
        // We whitelist known safe fields and ignore everything else
        const safeFields = ['code', 'details', 'hint', 'statusCode', 'status'];

        for (const key of safeFields) {
            if (key in error) {
                sanitized[key] = (error as any)[key];
            }
        }

        return sanitized;
    }

    if (typeof error === 'object' && error !== null) {
        // Generic object, might be a Supabase error object directly
        const sanitized: Record<string, unknown> = {};
        const safeFields = ['message', 'msg', 'code', 'details', 'hint', 'status', 'statusCode', 'error', 'error_description'];

        for (const key of safeFields) {
            if (key in error) {
                sanitized[key] = (error as any)[key];
            }
        }

        // If it has a message but wasn't caught above
        if (Object.keys(sanitized).length === 0) {
             return { message: 'Unknown error object', originalType: typeof error };
        }

        return sanitized;
    }

    if (typeof error === 'string') {
        return { message: error };
    }

    return { message: String(error) };
}
