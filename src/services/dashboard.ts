import { supabase as defaultClient } from '@/lib/supabase/client';
import { createClient } from '@supabase/supabase-js';
import {
    UtilizationMetricSchema,
    MonthlyUtilizationSchema,
    FleetAgeMetricSchema,
    CharterMetricSchema,
    OperatorMetricSchema,
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric
} from '@/lib/schemas';

const MODEL_ID = '550e8400-e29b-41d4-a716-446655440001'; // MVP: Hardcoded for now

// Sentinel: Factory to create an authenticated client if a token is provided
const getClient = (token?: string) => {
    if (!token) return defaultClient;

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );
};

export const dashboardService = {

    async getUtilization(token?: string): Promise<UtilizationMetric[]> {
        const { data, error } = await getClient(token)
            .from('aggregated_metrics')
            .select('period_date, value')
            .eq('model_id', MODEL_ID)
            .eq('metric_type', 'utilization_annual')
            .order('period_date', { ascending: true });

        if (error) throw error;

        return data.map(row => UtilizationMetricSchema.parse({
            year: row.period_date.substring(0, 4),
            hours: Number(row.value)
        }));
    },

    async getMonthlyUtilization(token?: string): Promise<MonthlyUtilization[]> {
        const { data, error } = await getClient(token)
            .from('aggregated_metrics')
            .select('period_date, value')
            .eq('model_id', MODEL_ID)
            .eq('metric_type', 'utilization_monthly')
            .order('period_date', { ascending: true });

        if (error) throw error;

        // Convert '2024-01-01' -> 'Jan'
        const getMonthName = (dateStr: string) => {
            const date = new Date(dateStr);
            return date.toLocaleString('default', { month: 'short' });
        };

        return data.map(row => MonthlyUtilizationSchema.parse({
            month: getMonthName(row.period_date),
            hours: Number(row.value)
        }));
    },

    async getFleetAge(token?: string): Promise<FleetAgeMetric[]> {
        const { data, error } = await getClient(token)
            .from('distributions')
            .select('bucket_label, value, color_hex')
            .eq('model_id', MODEL_ID)
            .eq('analysis_type', 'fleet_age')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        return data.map(row => FleetAgeMetricSchema.parse({
            age: row.bucket_label,
            count: Number(row.value),
            color: row.color_hex || '#000000'
        }));
    },

    async getCharterMix(token?: string): Promise<CharterMetric[]> {
        const { data, error } = await getClient(token)
            .from('distributions')
            .select('bucket_label, value, color_hex')
            .eq('model_id', MODEL_ID)
            .eq('analysis_type', 'charter_mix');

        if (error) throw error;

        return data.map(row => CharterMetricSchema.parse({
            name: row.bucket_label,
            value: Number(row.value),
            color: row.color_hex || '#000000'
        }));
    },

    async getOperatorConcentration(token?: string): Promise<OperatorMetric[]> {
        const { data, error } = await getClient(token)
            .from('distributions')
            .select('bucket_label, value')
            .eq('model_id', MODEL_ID)
            .eq('analysis_type', 'operator_concentration');

        if (error) throw error;

        return data.map(row => OperatorMetricSchema.parse({
            name: row.bucket_label,
            share: Number(row.value)
        }));
    }
};
