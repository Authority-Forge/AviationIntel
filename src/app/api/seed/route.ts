import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
            return NextResponse.json(
                { error: 'Missing environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });

        // 1. Aircraft Models
        const models = [
            {
                id: '550e8400-e29b-41d4-a716-446655440001',
                name: 'Bombardier Challenger 350',
                manufacturer: 'Bombardier',
                category: 'Super-Midsize',
                manufactured_start: 2014,
                image_url: '/images/challenger-ext.jpg',
                specs: { range: '3,200 nm', speed: '0.83 M', seats: 10 }
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440002',
                name: 'Cessna Citation Latitude',
                manufacturer: 'Textron Aviation',
                category: 'Midsize',
                manufactured_start: 2015,
                image_url: '/images/latitude-ext.jpg',
                specs: { range: '2,700 nm', speed: '0.80 M', seats: 9 }
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440003',
                name: 'Embraer Praetor 600',
                manufacturer: 'Embraer',
                category: 'Super-Midsize',
                manufactured_start: 2019,
                image_url: '/images/praetor-ext.jpg',
                specs: { range: '4,018 nm', speed: '0.83 M', seats: 12 }
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440004',
                name: 'Gulfstream G280',
                manufacturer: 'Gulfstream',
                category: 'Super-Midsize',
                manufactured_start: 2012,
                image_url: '/images/g280-ext.jpg',
                specs: { range: '3,600 nm', speed: '0.85 M', seats: 10 }
            }
        ];

        for (const model of models) {
            const { error } = await supabase.from('aircraft_models').upsert(model, { onConflict: 'id' });
            if (error) throw new Error(`Error inserting ${model.name}: ${error.message}`);
        }

        // 2. Metrics
        const metrics = [
            // Challenger
            { model_id: '550e8400-e29b-41d4-a716-446655440001', metric_type: 'utilization_annual', period_date: '2019-01-01', value: 420 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', metric_type: 'utilization_annual', period_date: '2020-01-01', value: 280 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', metric_type: 'utilization_annual', period_date: '2021-01-01', value: 380 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', metric_type: 'utilization_annual', period_date: '2022-01-01', value: 450 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', metric_type: 'utilization_annual', period_date: '2023-01-01', value: 410 },
            // Latitude
            { model_id: '550e8400-e29b-41d4-a716-446655440002', metric_type: 'utilization_annual', period_date: '2019-01-01', value: 580 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', metric_type: 'utilization_annual', period_date: '2020-01-01', value: 450 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', metric_type: 'utilization_annual', period_date: '2021-01-01', value: 620 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', metric_type: 'utilization_annual', period_date: '2022-01-01', value: 710 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', metric_type: 'utilization_annual', period_date: '2023-01-01', value: 690 },
            // Praetor
            { model_id: '550e8400-e29b-41d4-a716-446655440003', metric_type: 'utilization_annual', period_date: '2020-01-01', value: 250 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', metric_type: 'utilization_annual', period_date: '2021-01-01', value: 320 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', metric_type: 'utilization_annual', period_date: '2022-01-01', value: 390 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', metric_type: 'utilization_annual', period_date: '2023-01-01', value: 415 },
            // G280
            { model_id: '550e8400-e29b-41d4-a716-446655440004', metric_type: 'utilization_annual', period_date: '2019-01-01', value: 360 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', metric_type: 'utilization_annual', period_date: '2020-01-01', value: 290 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', metric_type: 'utilization_annual', period_date: '2021-01-01', value: 340 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', metric_type: 'utilization_annual', period_date: '2022-01-01', value: 375 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', metric_type: 'utilization_annual', period_date: '2023-01-01', value: 355 },
        ];

        for (const metric of metrics) {
            const { error } = await supabase.from('aggregated_metrics').insert(metric);
            if (error) throw new Error(`Error inserting metric: ${error.message}`);
        }

        // 3. Distributions
        const distributions = [
            // Challenger Fleet Age
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'fleet_age', bucket_label: '0-5 Years', value: 35 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'fleet_age', bucket_label: '6-10 Years', value: 45 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'fleet_age', bucket_label: '10+ Years', value: 20 },
            // Challenger Price Distribution
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'price_distribution', bucket_label: '$16M-$17M', value: 2, sort_order: 1 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'price_distribution', bucket_label: '$17M-$18M', value: 5, sort_order: 2 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'price_distribution', bucket_label: '$18M-$19M', value: 40, sort_order: 3 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'price_distribution', bucket_label: '$19M-$20M', value: 12, sort_order: 4 },
            { model_id: '550e8400-e29b-41d4-a716-446655440001', analysis_type: 'price_distribution', bucket_label: '$20M+', value: 3, sort_order: 5 },

            // Latitude Operator
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'operator_concentration', bucket_label: 'NetJets', value: 55 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'operator_concentration', bucket_label: 'Other', value: 45 },
            // Latitude Price Distribution
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'price_distribution', bucket_label: '$14M-$15M', value: 1, sort_order: 1 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'price_distribution', bucket_label: '$15M-$16M', value: 3, sort_order: 2 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'price_distribution', bucket_label: '$16M-$17M', value: 25, sort_order: 3 },
            { model_id: '550e8400-e29b-41d4-a716-446655440002', analysis_type: 'price_distribution', bucket_label: '$17M+', value: 2, sort_order: 4 },

            // Praetor
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'operator_concentration', bucket_label: 'Flexjet', value: 40 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'operator_concentration', bucket_label: 'AirSprint', value: 10 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'operator_concentration', bucket_label: 'Other', value: 50 },
            // Praetor Price Distribution
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'price_distribution', bucket_label: '$22M-$23M', value: 2, sort_order: 1 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'price_distribution', bucket_label: '$23M-$24M', value: 4, sort_order: 2 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'price_distribution', bucket_label: '$24M-$25M', value: 18, sort_order: 3 },
            { model_id: '550e8400-e29b-41d4-a716-446655440003', analysis_type: 'price_distribution', bucket_label: '$25M+', value: 5, sort_order: 4 },

            // G280 Price Distribution
            { model_id: '550e8400-e29b-41d4-a716-446655440004', analysis_type: 'price_distribution', bucket_label: '$17M-$18M', value: 3, sort_order: 1 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', analysis_type: 'price_distribution', bucket_label: '$18M-$19M', value: 5, sort_order: 2 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', analysis_type: 'price_distribution', bucket_label: '$19M-$20M', value: 22, sort_order: 3 },
            { model_id: '550e8400-e29b-41d4-a716-446655440004', analysis_type: 'price_distribution', bucket_label: '$20M+', value: 4, sort_order: 4 },
        ];

        for (const dist of distributions) {
            const { error } = await supabase.from('distributions').insert(dist);
            if (error) throw new Error(`Error inserting distribution: ${error.message}`);
        }

        // 4. Market Metrics
        const marketMetrics = [
            {
                model_id: '550e8400-e29b-41d4-a716-446655440001', // Challenger
                active_listings: 14,
                avg_asking_price: 18500000,
                asking_price_change: -1.9,
                avg_days_on_market: 110,
                trend_direction: 'down'
            },
            {
                model_id: '550e8400-e29b-41d4-a716-446655440002', // Latitude
                active_listings: 7,
                avg_asking_price: 16250000,
                asking_price_change: 0.5,
                avg_days_on_market: 75,
                trend_direction: 'stable'
            },
            {
                model_id: '550e8400-e29b-41d4-a716-446655440003', // Praetor
                active_listings: 10,
                avg_asking_price: 24500000,
                asking_price_change: -4.2,
                avg_days_on_market: 125,
                trend_direction: 'down'
            },
            {
                model_id: '550e8400-e29b-41d4-a716-446655440004', // G280
                active_listings: 11,
                avg_asking_price: 19100000,
                asking_price_change: -2.5,
                avg_days_on_market: 171,
                trend_direction: 'down'
            }
        ];

        for (const mm of marketMetrics) {
            const { error } = await supabase.from('market_metrics').insert(mm);
            if (error) throw new Error(`Error inserting market metric: ${error.message}`);
        }

        return NextResponse.json({ success: true, message: 'Database seeded successfully' });

    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
