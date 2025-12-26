import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';
import { type UtilizationBehaviorData } from '@/lib/schemas';

// Mock data hook for now
const useUtilizationBehavior = (modelId: string | null) => {
    const data: UtilizationBehaviorData = {
        stabilityIndex: 78,
        volatility: 'Low Volatility',
        annualDistribution: [
            { Range: '900-1000', Percentage: 30 },
            { Range: '1000-1100', Percentage: 72 },
            { Range: '1100-1200', Percentage: 45 },
            { Range: '1200-1300', Percentage: 25 },
            { Range: '1300-1400', Percentage: 10 },
            { Range: '1400-1500', Percentage: 55 },
        ],
        medianTrend: [
            { Month: 'Jan', Hours: 114 },
            { Month: 'Feb', Hours: 133 },
            { Month: 'Mar', Hours: 129 },
            { Month: 'Apr', Hours: 137 },
            { Month: 'May', Hours: 128 },
            { Month: 'Jun', Hours: 120 },
            { Month: 'Jul', Hours: 135 },
            { Month: 'Aug', Hours: 112 },
            { Month: 'Sep', Hours: 127 },
            { Month: 'Oct', Hours: 132 },
            { Month: 'Nov', Hours: 132 },
            { Month: 'Dec', Hours: 136 },
        ],
        takeaways: [
            "The fleet splits into two main groups: a standard cluster at 1,000–1,100 hours and a high-utilization charter group over 1,400 hours.",
            "Usage peaks sharply in April, July, and December, with a significant mid-summer dip in August.",
            "A Stability Index of 78/100 indicates that despite monthly swings, the fleet maintains a low-volatilty, predictable long-term profile.",
            "Over 50% of the fleet consistently operates above the 1,100-hour threshold, signaling high asset productivity."
        ]
    };

    return { data, loading: false };
};

export default function UtilizationBehavior({ modelId }: { modelId: string | null }) {
    const { data, loading } = useUtilizationBehavior(modelId);

    if (loading || !data) return <div className="animate-pulse h-96 bg-gray-50 rounded-2xl" />;

    return (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 lg:p-12">
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Utilization Behaviour
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-600">
                    Fleet behavior shows two distinct utilization clusters with stable median performance
                </p>
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Annual Distribution */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-8 px-2 flex items-center gap-2">
                        Annual Utilization
                        <Info className="h-3.5 w-3.5 text-slate-300" />
                    </h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.annualDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="Range"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="Percentage"
                                    fill="#2563eb"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Utilization Ranges - Hours
                        </div>
                    </div>
                </div>

                {/* Median Trend */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-8 px-2 flex items-center gap-2">
                        Median Utilization Over Time
                        <Info className="h-3.5 w-3.5 text-slate-300" />
                    </h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.medianTrend} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="Month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ paddingTop: '30px', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Line
                                    name="Median"
                                    type="monotone"
                                    dataKey="Hours"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Key Takeaways Section */}
            <div className="bg-slate-50/50 rounded-2xl p-8 lg:p-10 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 px-1">Key Takeaways</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Stability Index Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Utilization Stability Index
                        </p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-extrabold text-slate-900">
                                {data.stabilityIndex}/100
                            </span>
                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-md">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>Low Volatility</span>
                            </div>
                        </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="lg:col-span-2">
                        <ul className="space-y-4">
                            {data.takeaways.map((point, i) => (
                                <li key={i} className="flex gap-4 text-slate-600 leading-relaxed">
                                    <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                                    <span className="text-sm font-medium">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
