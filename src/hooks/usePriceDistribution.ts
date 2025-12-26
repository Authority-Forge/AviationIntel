import { useState, useEffect } from 'react';
import { distributionService } from '@/services/distribution';
import { type PriceBucket } from '@/lib/schemas';

export function usePriceDistribution(modelId: string | null) {
    const [data, setData] = useState<PriceBucket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!modelId) return;

            setLoading(true);
            setError(null);

            try {
                const result = await distributionService.getPriceDistribution(modelId);
                setData(result);
            } catch (err) {
                console.error('Failed to fetch price distribution:', err);
                setError('Failed to load distribution data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [modelId]);

    return { data, loading, error };
}
