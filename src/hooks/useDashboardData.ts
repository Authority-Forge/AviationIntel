import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard';
import {
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric
} from '@/lib/schemas';

interface DashboardData {
    utilizationData: UtilizationMetric[];
    monthlyUtilization: MonthlyUtilization[];
    fleetAgeData: FleetAgeMetric[];
    charterData: CharterMetric[];
    operatorData: OperatorMetric[];
}

export function useDashboardData(modelId: string | null) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!modelId) return;
        const id = modelId; // Capture for type safety

        let mounted = true;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const [util, month, fleet, charter, operator] = await Promise.all([
                    dashboardService.getUtilization(id),
                    dashboardService.getMonthlyUtilization(id),
                    dashboardService.getFleetAge(id),
                    dashboardService.getCharterMix(id),
                    dashboardService.getOperatorConcentration(id)
                ]);

                if (mounted) {
                    setData({
                        utilizationData: util,
                        monthlyUtilization: month,
                        fleetAgeData: fleet,
                        charterData: charter,
                        operatorData: operator
                    });
                }
            } catch (err: any) {
                console.error('Failed to fetch dashboard data:', err);
                if (mounted) setError(err.message || 'Failed to load dashboard data');
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchData();

        return () => { mounted = false; };
    }, [modelId]);

    return { ...data, loading, error };
}
