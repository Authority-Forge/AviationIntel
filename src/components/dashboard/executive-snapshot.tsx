'use client';

import React from 'react';
import { useModelSelection } from '@/hooks/useModelSelection';
import { useExecutiveSnapshot } from '@/hooks/useExecutiveSnapshot';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'stable';
    hasStar?: boolean;
}

function MetricCard({ label, value, trend, trendDirection, hasStar }: MetricCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col group hover:border-slate-300 transition-colors">
            {/* Header: White Background */}
            <div className="px-5 py-4 flex justify-between items-center bg-white border-b border-slate-100 min-h-[64px]">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 leading-tight">
                    {label}
                </h4>
                {hasStar && (
                    <Star className="h-4 w-4 text-slate-300 fill-slate-50" />
                )}
            </div>

            {/* Body: Subtle Background */}
            <div className="px-5 py-6 bg-slate-50/40 flex-grow">
                <div className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                    {value}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold tracking-tight ${trendDirection === 'up' ? 'text-emerald-600' :
                        trendDirection === 'down' ? 'text-rose-500' :
                            'text-slate-400'
                        }`}>
                        {trendDirection === 'up' && <TrendingUp className="h-3.5 w-3.5 stroke-[2.5px]" />}
                        {trendDirection === 'down' && <TrendingDown className="h-3.5 w-3.5 stroke-[2.5px]" />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ExecutiveSnapshot() {
    const { selectedModel } = useModelSelection();
    const { data, loading } = useExecutiveSnapshot(selectedModel?.id || null);

    if (loading) {
        return (
            <div className="space-y-10 animate-pulse">
                <div className="space-y-4">
                    <div className="h-10 w-80 bg-slate-100 rounded-lg"></div>
                    <div className="h-6 w-64 bg-slate-50 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-48 border border-slate-100 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 lg:p-12 space-y-12">
            <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Executive Snapshot</h2>
                <p className="mt-4 text-xl font-bold text-slate-700">
                    {selectedModel?.name} Key Metrics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    label="Median Annual Utilization (hrs)"
                    value={`${data.medianAnnualUtilization.value} hrs`}
                    trend={data.medianAnnualUtilization.trend}
                    trendDirection={data.medianAnnualUtilization.trendDirection}
                    hasStar
                />
                <MetricCard
                    label="Utilization Dispersion"
                    value={data.utilizationDispersion.value}
                    trend={data.utilizationDispersion.trend}
                    trendDirection={data.utilizationDispersion.trendDirection}
                />
                <MetricCard
                    label="Estimated Charter Penetration"
                    value={data.charterPenetration.value}
                    trend={data.charterPenetration.trend}
                    trendDirection={data.charterPenetration.trendDirection}
                />
                <MetricCard
                    label="Median Fleet Age"
                    value={`${data.medianFleetAge.value} years`}
                />
                <MetricCard
                    label="Year-Over-Year Utilization Trend"
                    value={`${data.utilizationTrendYoY.value}%`}
                    trend={data.utilizationTrendYoY.trend}
                    trendDirection={data.utilizationTrendYoY.trendDirection}
                />
                <MetricCard
                    label="Geographic Concentration Index"
                    value={`${data.geographicConcentration.value} Index`}
                    trend={data.geographicConcentration.trend}
                    trendDirection={data.geographicConcentration.trendDirection}
                />
            </div>

            <div className="max-w-4xl space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Key Takeaways</h3>
                <p className="text-slate-600 leading-relaxed text-[15px] font-medium antialiased">
                    {data.takeaways}
                </p>
            </div>
        </section>
    );
}
