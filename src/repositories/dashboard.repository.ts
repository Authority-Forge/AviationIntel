import { supabase } from '@/lib/supabase/client';
import {
    UtilizationMetricSchema,
    MonthlyUtilizationSchema,
    FleetAgeMetricSchema,
    CharterMetricSchema,
    OperatorMetricSchema,
    AircraftListingSchema,
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric,
    type AircraftListing
} from '@/lib/schemas';

export interface DashboardRepository {
    getUtilization(modelId: string): Promise<UtilizationMetric[]>;
    getMonthlyUtilization(modelId: string): Promise<MonthlyUtilization[]>;
    getFleetAge(modelId: string): Promise<FleetAgeMetric[]>;
    getCharterMix(modelId: string): Promise<CharterMetric[]>;
    getOperatorConcentration(modelId: string): Promise<OperatorMetric[]>;
    getMarketListings(modelId: string): Promise<AircraftListing[]>;
}

export class SupabaseDashboardRepository implements DashboardRepository {
    async getUtilization(modelId: string): Promise<UtilizationMetric[]> {
        const { data, error } = await supabase
            .from('aggregated_metrics')
            .select('period_date, value')
            .eq('model_id', modelId)
            .eq('metric_type', 'utilization_annual')
            .order('period_date', { ascending: true });

        if (error) throw error;

        return data.map(row => UtilizationMetricSchema.parse({
            year: row.period_date.substring(0, 4),
            hours: Number(row.value)
        }));
    }

    async getMonthlyUtilization(modelId: string): Promise<MonthlyUtilization[]> {
        const { data, error } = await supabase
            .from('aggregated_metrics')
            .select('period_date, value')
            .eq('model_id', modelId)
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
    }

    async getFleetAge(modelId: string): Promise<FleetAgeMetric[]> {
        const { data, error } = await supabase
            .from('distributions')
            .select('bucket_label, value, color_hex')
            .eq('model_id', modelId)
            .eq('analysis_type', 'fleet_age')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        return data.map(row => FleetAgeMetricSchema.parse({
            age: row.bucket_label,
            count: Number(row.value),
            color: row.color_hex || '#000000'
        }));
    }

    async getCharterMix(modelId: string): Promise<CharterMetric[]> {
        const { data, error } = await supabase
            .from('distributions')
            .select('bucket_label, value, color_hex')
            .eq('model_id', modelId)
            .eq('analysis_type', 'charter_mix');

        if (error) throw error;

        return data.map(row => CharterMetricSchema.parse({
            name: row.bucket_label,
            value: Number(row.value),
            color: row.color_hex || '#000000'
        }));
    }

    async getOperatorConcentration(modelId: string): Promise<OperatorMetric[]> {
        const { data, error } = await supabase
            .from('distributions')
            .select('bucket_label, value')
            .eq('model_id', modelId)
            .eq('analysis_type', 'operator_concentration');

        if (error) throw error;

        return data.map(row => OperatorMetricSchema.parse({
            name: row.bucket_label,
            share: Number(row.value)
        }));
    }

    async getMarketListings(modelId: string): Promise<AircraftListing[]> {
        // We'll join with aircraft_models to get the model name if needed,
        // but for now we assume we just fetch from listings table.
        // Also note: the schema defined 'serial_number' (snake_case) in DB,
        // but TS type expects camelCase. We need to map it.

        const { data, error } = await supabase
            .from('listings')
            .select(`
                id,
                serial_number,
                year,
                price,
                hours,
                location,
                status,
                days_on_market,
                aircraft_models (
                    name
                )
            `)
            .eq('model_id', modelId);

        if (error) throw error;

        return data.map((row: any) => AircraftListingSchema.parse({
            id: row.id,
            serialNumber: row.serial_number,
            year: row.year,
            model: row.aircraft_models?.name || 'Unknown Model', // Join result
            price: Number(row.price),
            hours: Number(row.hours),
            location: row.location,
            status: row.status,
            daysOnMarket: row.days_on_market
        }));
    }
}
