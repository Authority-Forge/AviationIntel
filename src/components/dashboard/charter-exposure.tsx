import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { type CharterExposureData } from '@/lib/schemas';

const useCharterExposure = (modelId: string | null) => {
    const data: CharterExposureData = {
        segments: [
            { name: 'Private Dominant', value: 56, percentage: 56, color: '#2563eb' },
            { name: 'Mixed Use', value: 34, percentage: 34, color: '#93c5fd' },
            { name: 'Charter Heavy', value: 10, percentage: 10, color: '#fb7185' },
        ],
        riskAnalysis: [
            {
                title: 'Faster Value Loss',
                description: 'Heavy charter use racks up hours quickly, causing faster depreciation and lower resale value than private-only jets.'
            },
            {
                title: 'Higher Costs & Risk',
                description: 'Charter flying speeds up costly maintenance needs and makes revenue more vulnerable during economic downturns.'
            }
        ]
    };
    return { data, loading: false };
};

const CustomLegend = ({ payload }: { payload: Array<{ value: string; color: string }> }) => {
    return (
        <div className="flex flex-col gap-4">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-3">
                    <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{entry.value}</span>
                        <span className="text-[10px] text-slate-500 font-medium">
                            {entry.value === 'Private Dominant' && '(Mostly Owner Operated)'}
                            {entry.value === 'Mixed Use' && '(Managed Charter)'}
                            {entry.value === 'Charter Heavy' && '(High Charter Utilization)'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const renderCustomLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, outerRadius, fill, percent } = props;

    // Calculate position outside the donut with padding
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Determine background color based on fill
    let bgColor = fill;
    if (fill === '#2563eb') bgColor = 'rgb(37, 99, 235)'; // blue-600
    if (fill === '#93c5fd') bgColor = 'rgb(147, 197, 253)'; // blue-300
    if (fill === '#fb7185') bgColor = 'rgb(251, 113, 133)'; // rose-400

    return (
        <g>
            <foreignObject
                x={x - 25}
                y={y - 12}
                width={50}
                height={24}
                style={{ overflow: 'visible' }}
            >
                <div
                    style={{
                        backgroundColor: bgColor,
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: '6px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </div>
            </foreignObject>
        </g>
    );
};

export default function CharterExposure({ modelId }: { modelId: string | null }) {
    const { data, loading } = useCharterExposure(modelId);

    if (loading || !data) return <div className="animate-pulse h-96 bg-gray-50 rounded-2xl" />;

    return (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 lg:p-12">
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Charter Exposure & Commercialization
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                    Estimated Share of Active Fleet
                </p>
            </div>

            {/* Donut Chart and Legend - Side by Side */}
            <div className="flex flex-row items-start gap-8 mb-12">
                {/* Left: Donut Chart */}
                <div className="flex-shrink-0">
                    <ResponsiveContainer width={900} height={800}>
                        <PieChart>
                            <Pie
                                data={data.segments}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                label={renderCustomLabel}
                                labelLine={false}
                            >
                                {data.segments.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Right: Legend */}
                <div className="flex-shrink-0">
                    <CustomLegend payload={data.segments.map(s => ({ value: s.name, color: s.color }))} />
                </div>
            </div>

            {/* Risk Analysis Section */}
            <div className="border-t border-slate-100 pt-10">
                <h3 className="text-lg font-bold text-slate-900 mb-6 px-1">
                    Charter Exposure & Risk Analysis
                </h3>

                <div className="space-y-5">
                    {data.riskAnalysis.map((risk, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                <span className="font-bold text-slate-900">{risk.title}:</span> {risk.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
