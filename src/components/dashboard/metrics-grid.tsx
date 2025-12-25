'use client';

import { useModelSelection } from '@/hooks/useModelSelection';
import { useMarketMetrics } from '@/hooks/useMarketMetrics';
import MetricCard from './metric-card';

export default function MetricsGrid() {
    const { selectedModelId } = useModelSelection();
    const { metrics, loading, error } = useMarketMetrics(selectedModelId);

    if (loading || !metrics && !error) {
        return (
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} data-testid="skeleton" className="animate-pulse overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="mt-4 h-8 w-32 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </dl>
        );
    }

    if (error) {
        return (
            <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Failed to load metrics</h3>
                    </div>
                </div>
            </div>
        );
    }

    if (!metrics) return null;

    return (
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
                title="Active Listings"
                value={metrics.activeListings}
                change={0}
                trend="stable"
            />
            <MetricCard
                title="Avg Asking Price"
                value={metrics.avgAskingPrice}
                format="currency"
                change={Math.abs(metrics.askingPriceVsMarket)}
                trend={metrics.trendDirection}
            />
            <MetricCard
                title="Days on Market"
                value={metrics.avgDaysOnMarket}
                change={0} // Mock data doesn't provide DOM change, defaults to 0
                trend={metrics.trendDirection === 'up' ? 'down' : 'up'} // Invert for "bad" up? simplified for now
            />
        </dl>
    );
}
