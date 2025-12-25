import { useMemo } from 'react';
import { getPriceDistribution } from '@/lib/mock-data/metrics';
import { PriceDistributionSchema, type PriceBucket } from '@/lib/schemas';

export function usePriceDistribution(modelId: string | null) {
    const { data, error } = useMemo(() => {
        if (!modelId) return { data: null, error: null };

        const rawData = getPriceDistribution(modelId);
        if (!rawData) return { data: null, error: 'No data found' };

        const result = PriceDistributionSchema.safeParse(rawData);

        if (!result.success) {
            console.error('Distribution Validation Error:', result.error);
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
