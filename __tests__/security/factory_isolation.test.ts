
import { createSupabaseClient } from '@/lib/supabase/server-client';

// Mock env vars
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'example-key';

describe('Supabase Client Factory Isolation', () => {
    it('creates distinct client instances for each call', () => {
        const client1 = createSupabaseClient();
        const client2 = createSupabaseClient();

        expect(client1).not.toBe(client2);

        // Verify state isolation
        (client1 as any).headers = { 'X-User-ID': '123' };

        expect((client2 as any).headers).not.toHaveProperty('X-User-ID');
    });
});
