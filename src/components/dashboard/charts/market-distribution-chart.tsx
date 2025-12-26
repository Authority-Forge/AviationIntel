'use client';

import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { CharterMetric, OperatorMetric } from '@/lib/schemas';
import GeographicMap from './geographic-map';

interface MarketDistributionChartProps {
    charterData: CharterMetric[];
    operatorData: OperatorMetric[];
}

export default function MarketDistributionChart({ charterData, operatorData }: MarketDistributionChartProps) {
    return (
        <>
            {/* Geographic Distribution & Operator Concentration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Distribution */}
                <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Geographic Distribution</h2>
                    <p className="text-sm text-gray-600 mb-6">(High Level)</p>

                    <GeographicMap />

                    <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                        The fleet remains heavily concentrated in North America (74%), creating high regional liquidity but exposing the asset class to U.S.-specific regulatory and economic shifts.
                    </p>
                </section>

                {/* Operator Concentration */}
                <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Operator Concentration</h2>
                    <p className="text-sm text-gray-600 mb-6">(Anonymous)</p>

                    <div className="h-[400px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[...operatorData].reverse()}
                                layout="vertical"
                                margin={{ top: 5, right: 20, bottom: 30, left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                                <XAxis
                                    type="number"
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                    axisLine={false}
                                    tickLine={false}
                                    label={{ value: 'Share of Active Fleet Controlled', position: 'insideBottom', offset: -20, style: { fontSize: '11px', fill: '#6b7280' } }}
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#6b7280"
                                    width={100}
                                    style={{ fontSize: '12px', fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                    label={{ value: '% of Operators', angle: -90, position: 'insideLeft', style: { fontSize: '11px', fill: '#6b7280' } }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                                    formatter={(value) => `${value}%`}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="share" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        High concentration creates a "bottleneck" where a single operator's fleet-wide divestment can flood the market, suppressing liquidity and destabilizing residual values for the entire asset class.
                    </p>
                </section>
            </div>
        </>
    );
}
