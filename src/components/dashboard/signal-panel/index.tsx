'use client';

import React, { useState } from 'react';

type SignalValue = 'Low' | 'Stable' | 'Moderate' | 'Watch' | 'Positive';

interface MarketSignal {
    id: string;
    label: string;
    value: SignalValue;
    description: string;
    perspective: 'buyer' | 'seller' | 'both';
    timeframe: 'short' | 'long';
}

const MOCK_SIGNALS: MarketSignal[] = [
    { id: '1', label: 'Residual Risk', value: 'Low', description: 'Strong value retention expected', perspective: 'buyer', timeframe: 'long' },
    { id: '2', label: 'Liquidity', value: 'Stable', description: 'Consistent transaction volume', perspective: 'both', timeframe: 'short' },
    { id: '3', label: 'Age Concentration', value: 'Moderate', description: '16% fleet reaching 16+ years', perspective: 'seller', timeframe: 'long' },
    { id: '4', label: 'Competition', value: 'Watch', description: 'Praetor 600 market entry', perspective: 'seller', timeframe: 'long' },
    { id: '5', label: 'Manufacturer', value: 'Positive', description: 'Strong OEM support network', perspective: 'buyer', timeframe: 'long' },
];

export default function SignalPanel() {
    const [perspective, setPerspective] = useState<'buyer' | 'seller'>('buyer');
    const [timeframe, setTimeframe] = useState<'short' | 'long'>('short');

    // Filter logic
    const filteredSignals = MOCK_SIGNALS.filter(signal =>
        (signal.perspective === 'both' || signal.perspective === perspective) &&
        // For MVP, showing all timeframes if matches perspective, or filtering by timeframe if desired.
        // Let's implement full filtering as per PRD.
        (timeframe === 'short' || signal.timeframe === timeframe || signal.timeframe === 'short')
        // Note: simplifying logic to show relevant signals. 
        // If long term selected, show short+long? Or just long? Usually both.
        // If short term, only short.
    );

    // Color mapping
    const getColor = (val: SignalValue) => {
        switch (val) {
            case 'Low': return 'green';
            case 'Stable': return 'blue';
            case 'Moderate': return 'amber';
            case 'Watch': return 'purple';
            case 'Positive': return 'green';
            default: return 'gray';
        }
    };

    return (
        <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Risk & Transition Signals</h2>

                {/* Filters */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setPerspective('buyer')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${perspective === 'buyer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Buyer
                    </button>
                    <button
                        onClick={() => setPerspective('seller')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${perspective === 'seller' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Seller
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredSignals.map((signal) => {
                    const color = getColor(signal.value);
                    const colorClasses = {
                        green: 'bg-green-50 border-green-200 text-green-600',
                        blue: 'bg-blue-50 border-blue-200 text-blue-600',
                        amber: 'bg-amber-50 border-amber-200 text-amber-600',
                        purple: 'bg-purple-50 border-purple-200 text-purple-600',
                        gray: 'bg-gray-50 border-gray-200 text-gray-600',
                    };

                    return (
                        <div key={signal.id} className={`${colorClasses[color]} border rounded-lg p-4 text-center transition-all hover:shadow-md`}>
                            <div className="font-bold text-lg mb-2">{signal.value}</div>
                            <p className="text-xs text-gray-600 font-medium">{signal.label}</p>
                            <p className="text-xs opacity-75 mt-2">{signal.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
