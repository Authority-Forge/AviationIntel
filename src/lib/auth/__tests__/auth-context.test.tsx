import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth-context';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        refresh: jest.fn(),
    }),
}));

// Mock Supabase
jest.mock('@supabase/auth-helpers-nextjs', () => ({
    createClientComponentClient: jest.fn(),
}));

describe('F1: Auth Context (Session & Logout)', () => {
    const mockSupabase = {
        auth: {
            getSession: jest.fn(),
            onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
            signInWithPassword: jest.fn(),
            signUp: jest.fn(),
            signOut: jest.fn(),
        },
    };

    beforeEach(() => {
        (createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase);
        jest.clearAllMocks();
    });

    // F1.3.1
    it('F1.3.1: Session persists (initial load)', async () => {
        const mockSession = { user: { id: '123', email: 'test@example.com' } };
        mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession }, error: null });

        const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => useAuth(), { wrapper });

        // Wait for effect
        await act(async () => { });

        expect(result.current.user).toEqual(mockSession.user);
    });

    // F1.4.1
    it('F1.4.1: Logout clears session', async () => {
        mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });

        const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signOut();
        });

        expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    });
});
