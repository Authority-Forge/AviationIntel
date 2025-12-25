'use client';

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import {
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric
} from '@/lib/schemas';

// Sub-components
import MetricsGrid from './metrics-grid'; // F3 (using mock/hook internally for now)
import UtilizationChart from './charts/utilization-chart'; // F4, F5
import FleetStructureChart from './charts/fleet-structure-chart'; // F6
import MarketDistributionChart from './charts/market-distribution-chart'; // F7
import SignalPanel from './signal-panel'; // F8
import AircraftTable from './aircraft-table'; // F9 (New)

interface DashboardContentProps {
    utilizationData: UtilizationMetric[];
    monthlyUtilization: MonthlyUtilization[];
    fleetAgeData: FleetAgeMetric[];
    charterData: CharterMetric[];
    operatorData: OperatorMetric[];
}

export default function DashboardContent({
    utilizationData,
    monthlyUtilization,
    fleetAgeData,
    charterData,
    operatorData
}: DashboardContentProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Challenger_350_Report',
        pageStyle: `
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        `,
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bombardier Challenger 350</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Super-Midsize
                                </span>
                                <span className="text-gray-500 text-sm">|</span>
                                <p className="text-gray-500 text-sm">Last Updated: Dec 25, 2024</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handlePrint()}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <Download className="h-4 w-4 text-gray-500" />
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" ref={componentRef}>
                {/* Hero / Images (Optional - kept for consistent look) */}
                <div className="grid grid-cols-4 gap-3 h-64">
                    <div className="col-span-2 row-span-2 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-medium">Main Aircraft Image</div>
                    </div>
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Interior</div>
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Cockpit</div>
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Layout</div>
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Specs</div>
                </div>

                {/* Key Metrics Grid (F3) */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Market Overview</h2>
                    <MetricsGrid />
                </section>

                {/* Utilization Charts (F4/F5) */}
                <UtilizationChart
                    annualData={utilizationData}
                    monthlyData={monthlyUtilization}
                />

                {/* Fleet Age (F6) */}
                <FleetStructureChart fleetAgeData={fleetAgeData} />

                {/* Market Dist (F7) */}
                <MarketDistributionChart
                    charterData={charterData}
                    operatorData={operatorData}
                />

                {/* Signal Panel (F8) */}
                <SignalPanel />

                {/* Aircraft Table (F9) */}
                <AircraftTable />

                {/* Methodology / Footer */}
                <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid text-sm text-gray-500">
                    <h3 className="font-semibold text-gray-900 mb-2">Methodology</h3>
                    <p>
                        Analysis incorporates data from 420 active Challenger 350 aircraft tracked across multiple proprietary and public databases including FAA registry, EASA registry, FLIGHTRADAR24 utilization tracking, JETNET aircraft valuations, and direct market transaction data. Fleet coverage exceeds 95% of known active aircraft.
                    </p>
                </section>
            </div>
        </div>
    );
}
