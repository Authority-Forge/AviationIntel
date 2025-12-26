'use client';

import { useMemo } from 'react';
import { getLatestMetrics, getDaysOnMarketChange } from '@/lib/mock-data/metrics';
import { MarketMetricSchema, type MarketMetric } from '@/lib/schemas';

export function useMarketMetrics(modelId: string | null) {
    const { metrics, daysOnMarketChange, error } = useMemo(() => {
        if (!modelId) return { metrics: null, daysOnMarketChange: 0, error: null };

        const rawData = getLatestMetrics(modelId);
        const domChange = getDaysOnMarketChange(modelId);

        if (!rawData) return { metrics: null, daysOnMarketChange: 0, error: null };

        const result = MarketMetricSchema.safeParse(rawData);

        if (!result.success) {
            console.error('Metric Validation Error:', result.error);
            return { metrics: null, daysOnMarketChange: 0, error: 'Data validation failed' };
        }

        return { metrics: result.data, daysOnMarketChange: domChange, error: null };
    }, [modelId]);

    return {
        metrics,
        daysOnMarketChange,
        loading: false, // Mock data is instant
        error
    };
}
