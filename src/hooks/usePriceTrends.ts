import { useMemo } from 'react';
import { getPriceHistory } from '@/lib/mock-data/metrics';
import { PriceTrendSchema, type PricePoint } from '@/lib/schemas';

export function usePriceTrends(modelId: string | null) {
    const { data, error } = useMemo(() => {
        if (!modelId) return { data: null, error: null };

        const rawData = getPriceHistory(modelId);
        if (!rawData) return { data: null, error: 'No data found' };

        const result = PriceTrendSchema.safeParse(rawData);

        if (!result.success) {
            console.error('Trend Validation Error:', result.error);
            return { data: null, error: 'Data validation failed' };
        }

        return { data: result.data, error: null };
    }, [modelId]);

    return {
        data,
        loading: false, // Mock is instant
        error
    };
}
