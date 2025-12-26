'use client';

import React, { useRef } from 'react';
import { useModelSelection } from '@/hooks/useModelSelection';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useReactToPrint } from 'react-to-print';
import { AlertCircle } from 'lucide-react';

// Sub-components
import DashboardGallery from './dashboard-gallery';
import ExecutiveSnapshot from './executive-snapshot';
import UtilizationBehavior from './utilization-behavior';
import FleetStructureAging from './fleet-structure-aging';
import CharterExposure from './charter-exposure';
import MarketDistributionChart from './charts/market-distribution-chart';
import SignalPanel from './signal-panel';
import WhatThisMeans from './what-this-means';
import MethodologyConfidence from './methodology-confidence';
import { useMarketMetrics } from '@/hooks/useMarketMetrics';

export default function DashboardContent() {
    const componentRef = useRef<HTMLDivElement>(null);
    const { selectedModel } = useModelSelection();
    const { metrics } = useMarketMetrics(selectedModel?.id || null);

    // Fetch data based on selection
    const {
        utilizationData,
        monthlyUtilization,
        fleetAgeData,
        charterData,
        operatorData,
        loading: contentLoading,
        error
    } = useDashboardData(selectedModel?.id || null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: selectedModel ? `${selectedModel.name}_Report` : 'Aircraft_Report',
        pageStyle: `
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        `,
    });

    if (!selectedModel) {
        return <div className="p-8 text-center text-gray-500">Please select an aircraft model.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" ref={componentRef}>
                <DashboardGallery
                    selectedModel={selectedModel}
                    metrics={metrics}
                    onPrint={handlePrint}
                />

                <ExecutiveSnapshot />

                {/* Utilization Behavior (F12) */}
                <UtilizationBehavior modelId={selectedModel.id} />

                {/* Fleet Structure & Aging (F13) */}
                <FleetStructureAging modelId={selectedModel.id} />

                {/* Charter Exposure & Commercialization (F14) */}
                <CharterExposure modelId={selectedModel.id} />

                {/* Geographic Distribution & Operator Concentration (F7) */}
                {error ? (
                    <div className="rounded-md bg-red-50 p-4 border border-red-200 text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Failed to load geographic data. Please try again. ({error})
                    </div>
                ) : contentLoading ? (
                    <div className="space-y-8 animate-pulse">
                        <div className="h-64 bg-gray-100 rounded-lg"></div>
                    </div>
                ) : (
                    <>
                        {charterData && operatorData && (
                            <MarketDistributionChart
                                charterData={charterData}
                                operatorData={operatorData}
                            />
                        )}
                    </>
                )}

                {/* Signal Panel (F8) */}
                <SignalPanel />

                {/* What This Means */}
                <WhatThisMeans />

                {/* Methodology & Confidence */}
                <MethodologyConfidence />


            </div>
        </div>
    );
}
