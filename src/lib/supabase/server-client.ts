
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a new Supabase client instance.
 * Specific for server-side usage to ensure request isolation.
 * Environment variables are read at runtime to support testing and dynamic configuration.
 */
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(supabaseUrl, supabaseKey);
};
