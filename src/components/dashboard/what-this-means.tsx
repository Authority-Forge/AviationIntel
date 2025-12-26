'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';

type TabView = 'Operators' | 'Brokers' | 'Financiers';

export default function WhatThisMeans() {
    const [activeTab, setActiveTab] = useState<TabView>('Operators');

    return (
        <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What This Means</h2>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-6">
                {(['Operators', 'Brokers', 'Financiers'] as TabView[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Card */}
            <div className="rounded-lg border border-blue-100 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">Primary Watch Item</span>
                </div>

                {/* Body */}
                <div className="p-6 bg-white">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">
                        Rising operating costs may compress margins in the next 2-3 quarters.
                    </h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
