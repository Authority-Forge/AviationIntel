'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useModelSelection } from '@/hooks/useModelSelection';
import { usePriceTrends } from '@/hooks/usePriceTrends';
import { formatCurrency } from '@/lib/utils/format';

export default function PriceTrendChart() {
    const { selectedModelId } = useModelSelection();
    const { data: trendData, loading, error } = usePriceTrends(selectedModelId);

    if (loading) {
        return <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-lg"></div>;
    }

    if (error || !trendData || trendData.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-gray-500">No trend data available</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Average Asking Price (12 Mo)</h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={trendData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                            <p className="font-medium text-gray-900">{label}</p>
                                            <p className="text-sm text-blue-600 font-semibold">
                                                {formatCurrency(data.price)}
                                            </p>
                                            {data.volume !== undefined && (
                                                <p className="text-xs text-gray-500">
                                                    {data.volume} Active Listings
                                                </p>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#2563eb' }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
