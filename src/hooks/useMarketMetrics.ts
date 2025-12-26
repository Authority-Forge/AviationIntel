import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { MarketMetricSchema, type MarketMetric } from '@/lib/schemas';

export function useMarketMetrics(modelId: string | null) {
    const [metrics, setMetrics] = useState<MarketMetric | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!modelId) return;

        async function fetchMetrics() {
            setLoading(true);
            setError(null);
            try {
                // Fetch basic metrics from aggregated table or dedicated endpoint
                // For MVP, we'll assume we have a view or table 'market_summaries' or similar.
                // If not, we might need to aggregate manually or use the existing distributions.
                // Let's assume a row exists in 'market_metrics' table per model per day.

                const { data, error: dbError } = await supabase
                    .from('market_metrics')
                    .select('*')
                    .eq('model_id', modelId)
                    .order('date', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (dbError) throw dbError;
                if (!data) {
                    console.warn(`No market metrics found for model ${modelId}`);
                    setMetrics(null);
                    return;
                }

                // Map DB snake_case to CamelCase matching Schema
                const parsed = MarketMetricSchema.parse({
                    id: data.id,
                    modelId: data.model_id,
                    date: data.date,
                    activeListings: data.active_listings,
                    avgAskingPrice: Number(data.avg_asking_price),
                    askingPriceVsMarket: Number(data.asking_price_change || 0),
                    avgDaysOnMarket: data.avg_days_on_market,
                    trendDirection: data.trend_direction || 'stable',
                    residualValueStrength: 88, // Default for now
                    marketActivityScore: 72    // Default for now
                });

                setMetrics(parsed);
            } catch (err: any) {
                console.error('Error fetching metrics detailed:', {
                    message: err.message,
                    details: err.details,
                    hint: err.hint,
                    code: err.code
                });
                setError(err.message || 'Failed to load metrics');
            } finally {
                setLoading(false);
            }
        }

        fetchMetrics();
    }, [modelId]);

    return { metrics, loading, error };
}
