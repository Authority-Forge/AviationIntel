'use client';

import { useMemo } from 'react';
import { getLatestMetrics } from '@/lib/mock-data/metrics';
import { MarketMetricSchema, type MarketMetric } from '@/lib/schemas';

export function useMarketMetrics(modelId: string | null) {
    const { metrics, error } = useMemo(() => {
        if (!modelId) return { metrics: null, error: null };

        const rawData = getLatestMetrics(modelId);
        if (!rawData) return { metrics: null, error: null };

        const result = MarketMetricSchema.safeParse(rawData);

        if (!result.success) {
            console.error('Metric Validation Error:', result.error);
            return { metrics: null, error: 'Data validation failed' };
        }

        return { metrics: result.data, error: null };
    }, [modelId]);

    return {
        metrics,
        loading: false, // Mock data is instant
        error
    };
}
