
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log(`Testing connection to: ${supabaseUrl}`);

    // Try to select from a table we expect to exist (or just check health)
    const { data, error } = await supabase.from('aircraft_models').select('count', { count: 'exact', head: true });

    if (error) {
        if (error.code === '42P01') { // undefined_table
            console.log('✅ Connected to Supabase!');
            console.warn('⚠️  Tables do NOT exist yet (Schema needs applying).');
            return 'schema_missing';
        }
        console.error('❌ Connection Failed:', error.message);
        return 'failed';
    }

    console.log('✅ Connected to Supabase!');
    console.log('✅ Schema seems present (aircraft_models found).');
    return 'success';
}

testConnection();
