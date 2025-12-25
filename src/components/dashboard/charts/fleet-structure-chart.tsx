'use client';

import {
    BarChart, Bar, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { FleetAgeMetric } from '@/lib/schemas';

interface FleetStructureChartProps {
    fleetAgeData: FleetAgeMetric[];
}

export default function FleetStructureChart({ fleetAgeData }: FleetStructureChartProps) {
    return (
        <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fleet Structure & Aging</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Fleet Age Distribution</h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fleetAgeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis
                                    dataKey="age"
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {fleetAgeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Per Age Distribution</h3>
                    <div className="space-y-6 mt-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-700">Average Fleet Age</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-2xl font-bold text-gray-900">8.5 years</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">The fleet maintains a relatively young age profile, supporting strong market health and residual values.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <p className="text-xs text-gray-600 leading-relaxed">Peak production occurred between 2017-2020, creating a concentration in the 5-8 year age bracket. Approximately 16% of the fleet exceeds 16 years, approaching major inspection cycles that may influence market values.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <p className="text-xs text-gray-600 leading-relaxed">34% of the fleet is under 5 years old, indicating continued strong demand for new deliveries and positive market sentiment for the platform.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
