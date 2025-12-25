'use client';

import {
    BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { UtilizationMetric, MonthlyUtilization } from '@/lib/schemas';

interface UtilizationChartProps {
    annualData: UtilizationMetric[];
    monthlyData: MonthlyUtilization[];
}

export default function UtilizationChart({ annualData, monthlyData }: UtilizationChartProps) {
    return (
        <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilization Behaviour</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
                {/* Annual Utilization */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Annual Utilization</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={annualData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Utilization */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Utilization Per Year</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="hours"
                                    stroke="#3B82F6"
                                    strokeWidth={2.5}
                                    dot={{ fill: '#3B82F6', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Takeaways</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Fleet utilization recovered strongly post-2020, reaching pre-pandemic levels of approximately 400 hours annually. The Challenger 350 demonstrates stable demand patterns with minimal seasonal variation, indicating strong year-round usage across both corporate and charter segments. Current utilization rates align with category averages, supporting stable residual value projections.
                </p>
            </div>
        </section>
    );
}
