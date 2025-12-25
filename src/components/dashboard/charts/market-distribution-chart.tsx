'use client';

import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { CharterMetric, OperatorMetric } from '@/lib/schemas';

interface MarketDistributionChartProps {
    charterData: CharterMetric[];
    operatorData: OperatorMetric[];
}

export default function MarketDistributionChart({ charterData, operatorData }: MarketDistributionChartProps) {
    return (
        <>
            {/* Charter Exposure & Commercialization */}
            <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Charter Exposure & Commercialization</h2>
                <p className="text-sm text-gray-600 mb-6">Estimated Share of Active Fleet</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex items-center justify-center">
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={charterData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {charterData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '12px' }} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value, entry: any) => <span className="text-sm text-gray-600 font-medium ml-1">{value}: {entry.payload.value}%</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Charter Exposure & Mix Analysis</h3>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Lower charter exposure compared to category average (typically 40-45%) suggests strong owner-operator preference. This profile typically correlates with better maintenance standards, lower utilization stress, and stronger residual value retention.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-600">Private/Corporate</span>
                                    <span className="text-sm font-bold text-gray-900">68%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-600">Charter/Commercial</span>
                                    <span className="text-sm font-bold text-gray-900">32%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Geographic Distribution & Operator Concentration */}
            <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Geographic Distribution</h2>
                        <p className="text-sm text-gray-600 mb-4">Flight Level</p>

                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 h-64 flex items-center justify-center mb-6 border border-blue-100">
                            <div className="text-center">
                                <div className="text-blue-600 text-6xl mb-2 opacity-80">🌎</div>
                                <p className="text-sm text-gray-600 font-medium">Global Fleet Distribution Map</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between pb-2 border-b border-gray-50">
                                <span>North America</span>
                                <span className="font-semibold text-gray-900">58%</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-50">
                                <span>Europe</span>
                                <span className="font-semibold text-gray-900">22%</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-50">
                                <span>Asia Pacific</span>
                                <span className="font-semibold text-gray-900">12%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Other</span>
                                <span className="font-semibold text-gray-900">8%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Operator Concentration</h2>
                        <p className="text-sm text-gray-600 mb-4">Geographic</p>

                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={operatorData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                                    <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#6b7280"
                                        width={100}
                                        style={{ fontSize: '12px', fontWeight: 500 }}
                                        axisLine={false}
                                        tickLine={false}
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

                        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                            Well-distributed operator base with no single entity controlling more than 13% of fleet. Top three fractional operators (NetJets, VistaJet, Flexjet) collectively hold approximately 27% of active aircraft, indicating healthy market diversity.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
