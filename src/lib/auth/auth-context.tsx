'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { LoginInput, RegisterInput } from '../schemas/auth';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (data: LoginInput) => Promise<void>;
    signUp: (data: RegisterInput) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
            if (!session) {
                // router.push('/login'); // Optional automatic redirect logic
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, router]);

    const signIn = async ({ email, password }: LoginInput) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        router.refresh();
    };

    const signUp = async ({ email, password }: RegisterInput) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        router.refresh();
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.push('/login');
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
