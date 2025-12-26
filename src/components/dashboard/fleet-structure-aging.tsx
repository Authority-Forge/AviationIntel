import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Info, RefreshCw, AlertCircle } from 'lucide-react';
import { type FleetStructureAgingData } from '@/lib/schemas';

const useFleetStructureAging = (modelId: string | null) => {
    const data: FleetStructureAgingData = {
        distribution: [
            { Range: '0-2', Percentage: 12 },
            { Range: '2-4', Percentage: 25 },
            { Range: '4-6', Percentage: 42 },
            { Range: '6-8', Percentage: 55 },
            { Range: '8-10+', Percentage: 65 },
        ],
        insights: [
            {
                type: 'risk',
                title: 'Asset Liquidity Risk',
                text: 'With a median fleet age of 6 years (sim), a significant portion of the Challenger 350 fleet is currently entering the primary 5–8 year resale window, which may lead to increased inventory levels and downward price pressure.'
            },
            {
                type: 'alignment',
                title: 'Maintenance Cycle Alignment',
                text: 'As the fleet matures past the 6-year mark, operators should anticipate a cluster of major scheduled inspections (such as 72-month or 96-month checks), impacting short-term fleet availability.'
            }
        ]
    };
    return { data, loading: false };
};

export default function FleetStructureAging({ modelId }: { modelId: string | null }) {
    const { data, loading } = useFleetStructureAging(modelId);

    if (loading || !data) return <div className="animate-pulse h-96 bg-gray-50 rounded-2xl" />;

    return (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 lg:p-12">
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Fleet Structure & Aging
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Chart Area */}
                <div className="lg:col-span-2 relative">
                    <h3 className="text-sm font-bold text-slate-900 mb-12 px-2">Fleet Age Distribution</h3>

                    <div className="relative h-[400px] w-full">
                        {/* Annotations Layer */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            {/* Primary Replacement Window Annotation */}
                            <div className="absolute top-[12%] left-[60%] w-[33%] -translate-x-1/2">
                                <div className="bg-[#BFDBFE] border border-blue-200 rounded-xl py-3 px-4 shadow-sm flex items-center justify-center text-center relative">
                                    <span className="text-[11px] font-extrabold text-white leading-tight tracking-tight">
                                        Primary Replacement<br />Window
                                    </span>
                                    {/* Pointer arrow */}
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#BFDBFE] border-r border-b border-blue-200 rotate-45" />
                                </div>
                            </div>

                            {/* Higher Maintenance Cost Annotation */}
                            <div className="absolute top-[-5%] left-[87.5%] w-[18%] -translate-x-1/2">
                                <div className="bg-[#FECACA] border border-rose-200 rounded-xl py-4 px-3 shadow-sm flex items-center justify-center text-center relative">
                                    <span className="text-[11px] font-extrabold text-white leading-tight tracking-tight">
                                        Higher<br />Maintenance<br />Cost
                                    </span>
                                    {/* Pointer arrow */}
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FECACA] border-r border-b border-rose-200 rotate-45" />
                                </div>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.distribution} margin={{ top: 40, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="Range"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: '#cbd5e1' }}
                                    tickFormatter={(val) => `${val}%`}
                                    ticks={[5, 20, 40, 60, 80]}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="Percentage"
                                    radius={[4, 4, 0, 0]}
                                    barSize={60}
                                >
                                    {data.distribution.map((entry, index) => {
                                        // Colors based on mock: 0-4 are dark blue, 4-8 are light blue, 8+ is red
                                        let fill = "#2563eb"; // default dark blue
                                        if (index === 2 || index === 3) fill = "#93c5fd"; // light blue
                                        if (index === 4) fill = "#fb7185"; // rose-red
                                        return <Cell key={`cell-${index}`} fill={fill} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Age Ranges
                        </div>
                    </div>
                </div>

                {/* Right: Insights Area */}
                <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm h-fit">
                    <h3 className="text-base font-bold text-slate-900 mb-8 px-1">Key Age Profile Insights</h3>

                    <div className="space-y-10">
                        {data.insights.map((insight, i) => (
                            <div key={i} className="flex gap-5 group">
                                <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors
                                    ${insight.type === 'risk' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'}
                                `}>
                                    {insight.type === 'risk' ? (
                                        <Info className="h-5 w-5" />
                                    ) : (
                                        <RefreshCw className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        {insight.title}
                                    </h4>
                                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                                        {insight.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
