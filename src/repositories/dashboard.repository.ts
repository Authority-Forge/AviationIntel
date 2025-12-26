import { supabase } from '@/lib/supabase/client';
import {
    UtilizationMetricSchema,
    MonthlyUtilizationSchema,
    FleetAgeMetricSchema,
    CharterMetricSchema,
    OperatorMetricSchema,
    MarketMetricSchema,
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric,
    type MarketMetric
} from '@/lib/schemas';

export interface DashboardRepository {
    getUtilization(modelId: string): Promise<UtilizationMetric[]>;
    getMonthlyUtilization(modelId: string): Promise<MonthlyUtilization[]>;
    getFleetAge(modelId: string): Promise<FleetAgeMetric[]>;
    getCharterMix(modelId: string): Promise<CharterMetric[]>;
    getOperatorConcentration(modelId: string): Promise<OperatorMetric[]>;
    getMarketMetrics(modelId: string): Promise<MarketMetric | null>;
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

    async getMarketMetrics(modelId: string): Promise<MarketMetric | null> {
        const { data, error } = await supabase
            .from('market_metrics')
            .select('*')
            .eq('model_id', modelId)
            .order('period_date', { ascending: false })
            .limit(1)
            .single();

        if (error) {
             if (error.code === 'PGRST116') return null; // No rows found
             throw error;
        }

        // Map snake_case DB columns to camelCase schema fields
        return MarketMetricSchema.parse({
            id: data.id,
            modelId: data.model_id,
            date: data.period_date,
            askingPriceVsMarket: Number(data.asking_price_vs_market),
            residualValueStrength: Number(data.residual_value_strength),
            marketActivityScore: Number(data.market_activity_score),
            avgAskingPrice: Number(data.avg_asking_price),
            avgDaysOnMarket: Number(data.avg_days_on_market),
            activeListings: Number(data.active_listings),
            trendDirection: data.trend_direction
        });
    }
}
