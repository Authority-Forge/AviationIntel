'use client';
import { type MarketMetric } from '@/lib/schemas';
import MetricCard from './metric-card';

interface MetricsGridProps {
    metrics?: MarketMetric;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
    if (!metrics) {
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

    // TODO: Calculate daysOnMarketChange from historical data when available
    const daysOnMarketChange = 0;

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
                change={daysOnMarketChange}
                trend={daysOnMarketChange > 0 ? 'up' : daysOnMarketChange < 0 ? 'down' : 'stable'}
                inverse={true}
            />
        </dl>
    );
}