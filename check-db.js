const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function checkDb() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        console.error('Missing env vars');
        return;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    console.log('--- Tables Check ---');
    const tables = ['aircraft_models', 'market_metrics'];
    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) {
            console.error(`Error checking ${table}:`, error.message);
        } else {
            console.log(`${table} count:`, count);
        }
    }

    console.log('\n--- Aircraft Models IDs ---');
    const { data: models, error: modelsError } = await supabase.from('aircraft_models').select('id, name');
    if (modelsError) {
        console.error('Error fetching aircraft_models:', modelsError.message);
    } else {
        console.log(JSON.stringify(models, null, 2));
    }

    console.log('\n--- Market Metrics Content ---');
    const { data: mm, error: mmError } = await supabase.from('market_metrics').select('*').limit(5);
    if (mmError) {
        console.error('Error fetching market_metrics data:', mmError.message);
    } else {
        console.log(JSON.stringify(mm, null, 2));
    }
}

checkDb();
