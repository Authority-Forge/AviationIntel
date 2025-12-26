'use client';

import React from 'react';
import { useModelSelection } from '@/hooks/useModelSelection';
import MetricsGrid from '@/components/dashboard/metrics-grid';
import PriceDistributionChart from '@/components/dashboard/charts/price-distribution';
import AircraftTable from '@/components/dashboard/aircraft-table';

export default function MarketAnalysisContent() {
    const { selectedModel } = useModelSelection();

    if (!selectedModel) {
        return <div className="p-8 text-center text-gray-500">Please select an aircraft model.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Market Analysis</h1>
                        <p className="mt-1 text-sm text-gray-500">Detailed pricing trends and active inventory for {selectedModel.name}</p>
                    </div>
                </div>

                {/* Key Metrics Grid (F3) / Market Overview */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Market Overview</h2>
                    <MetricsGrid />
                </section>

                {/* Price Distribution (F4) */}
                <section>
                    <PriceDistributionChart />
                </section>

                {/* Aircraft Table (F9) */}
                <AircraftTable />
            </div>
        </div>
    );
}
