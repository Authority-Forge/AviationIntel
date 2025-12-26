'use client';

import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
    Label
} from 'recharts';
import { useModelSelection } from '@/hooks/useModelSelection';
import { usePriceDistribution } from '@/hooks/usePriceDistribution';
import { useMarketMetrics } from '@/hooks/useMarketMetrics';
import { formatCurrency } from '@/lib/utils/format';

export default function PriceDistributionChart() {
    const { selectedModelId } = useModelSelection();
    const { data: distribution, loading: distLoading, error: distError } = usePriceDistribution(selectedModelId);
    const { metrics, loading: metricsLoading } = useMarketMetrics(selectedModelId);

    const loading = distLoading || metricsLoading;

    // Memoize Peak Logic and bucket finding for average marker
    const processedData = useMemo(() => {
        if (!distribution) return [];
        const maxCount = Math.max(...distribution.map(d => d.count));
        return distribution.map(bucket => ({
            ...bucket,
            isPeak: bucket.count === maxCount
        }));
    }, [distribution]);

    // Find bucket index for the average price marker
    const avgPriceBucketIndex = useMemo(() => {
        if (!distribution || !metrics?.avgAskingPrice) return -1;

        const avgMillions = metrics.avgAskingPrice / 1000000;

        return distribution.findIndex(bucket =>
            avgMillions >= bucket.min && avgMillions < bucket.max
        );
    }, [distribution, metrics]);

    if (loading) {
        return <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-lg"></div>;
    }

    if (distError || !processedData.length) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-gray-500">No distribution data available</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Asking Price Distribution</h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={processedData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="range"
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            content={({ active, payload }) => {
                                if (active && payload?.[0]) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-md">
                                            <p className="text-sm font-semibold text-slate-900">{data.range}</p>
                                            <p className="text-xs text-slate-500">
                                                {data.count} Listing{data.count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />

                        {avgPriceBucketIndex !== -1 && (
                            <ReferenceLine
                                x={processedData[avgPriceBucketIndex].range}
                                stroke="#0ea5e9"
                                strokeDasharray="3 3"
                                strokeWidth={2}
                            >
                                <Label
                                    value="Market Avg"
                                    position="top"
                                    fill="#0ea5e9"
                                    fontSize={10}
                                    fontWeight="bold"
                                    offset={10}
                                />
                            </ReferenceLine>
                        )}

                        <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                            {processedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.isPeak ? '#0ea5e9' : '#cbd5e1'}
                                    fillOpacity={entry.isPeak ? 1 : 0.6}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
