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
    Cell
} from 'recharts';
import { useModelSelection } from '@/hooks/useModelSelection';
import { usePriceDistribution } from '@/hooks/usePriceDistribution';
import { formatCurrency } from '@/lib/utils/format';

export default function PriceDistributionChart() {
    const { selectedModelId } = useModelSelection();
    const { data: distribution, loading, error } = usePriceDistribution(selectedModelId);

    // Memoize Peak Logic
    const processedData = useMemo(() => {
        if (!distribution) return [];

        // Find the max count to highlight the "Peak" bar
        const maxCount = Math.max(...distribution.map(d => d.count));

        return distribution.map(bucket => ({
            ...bucket,
            isPeak: bucket.count === maxCount
        }));
    }, [distribution]);

    if (loading) {
        return <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-lg"></div>;
    }

    if (error || !processedData.length) {
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
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="range"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            interval={0} // Force show all labels if space permits, or adjust
                        // If buckets are ranges like "$17M-$18M", we might want to split or shorten labels
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                            <p className="font-medium text-gray-900">{data.range}</p>
                                            <p className="text-sm text-gray-500">
                                                {data.count} Listing{data.count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {processedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.isPeak ? '#0ea5e9' : '#e2e8f0'} // Blue for peak, Gray for others
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
