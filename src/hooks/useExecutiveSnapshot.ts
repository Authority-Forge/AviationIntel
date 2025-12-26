import { useState, useEffect } from 'react';
import { type ExecutiveSnapshot } from '@/lib/schemas';

const MOCK_SNAPSHOT: Record<string, ExecutiveSnapshot> = {
    '550e8400-e29b-41d4-a716-446655440001': {
        medianAnnualUtilization: { value: 850, trend: '95% CI ± 2.5%', trendDirection: 'up' },
        utilizationDispersion: { value: '200-400 hrs (IQR)', trend: '95% CI ± 2.5%', trendDirection: 'up' },
        charterPenetration: { value: '10%-20%', trend: '10% CI ± 1.5%', trendDirection: 'down' },
        medianFleetAge: { value: 6 },
        utilizationTrendYoY: { value: -5, trend: '10% CI ± 1.5%', trendDirection: 'down' },
        geographicConcentration: { value: 0.65, trend: '95% CI ± 2.5%', trendDirection: 'up' },
        takeaways: "The Bombardier Challenger 350 fleet maintains a solid 850-hour median annual utilization, though a wide IQR suggests significant usage variance between private and charter operators. While the fleet remains relatively young at a 6-year median age, a 5% year-over-year decline in flight hours indicates a slight cooling in overall market activity."
    }
};

const DEFAULT_SNAPSHOT: ExecutiveSnapshot = {
    medianAnnualUtilization: { value: 0, trend: '...', trendDirection: 'stable' },
    utilizationDispersion: { value: '...', trend: '...', trendDirection: 'stable' },
    charterPenetration: { value: '...', trend: '...', trendDirection: 'stable' },
    medianFleetAge: { value: 0 },
    utilizationTrendYoY: { value: 0, trend: '...', trendDirection: 'stable' },
    geographicConcentration: { value: 0, trend: '...', trendDirection: 'stable' },
    takeaways: "No data available for the selected model."
};

export function useExecutiveSnapshot(modelId: string | null) {
    const [data, setData] = useState<ExecutiveSnapshot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!modelId) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            const result = MOCK_SNAPSHOT[modelId] || DEFAULT_SNAPSHOT;
            setData(result);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [modelId]);

    return { data, loading, error };
}
