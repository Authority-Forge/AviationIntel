'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

interface AircraftListing {
    id: string;
    serialNumber: string;
    year: number;
    model: string;
    price: number;
    hours: number;
    location: string;
    status: 'active' | 'pending' | 'sold' | 'withdrawn';
    daysOnMarket: number;
}

// Mock data for initial implementation (will be replaced by props/hook)
const MOCK_LISTINGS: AircraftListing[] = [
    { id: '1', serialNumber: '20638', year: 2017, model: 'Challenger 350', price: 18500000, hours: 1450, location: 'USA (NC)', status: 'active', daysOnMarket: 45 },
    { id: '2', serialNumber: '20712', year: 2018, model: 'Challenger 350', price: 19200000, hours: 1100, location: 'USA (TX)', status: 'active', daysOnMarket: 12 },
    { id: '3', serialNumber: '20555', year: 2015, model: 'Challenger 350', price: 16800000, hours: 2200, location: 'UK', status: 'pending', daysOnMarket: 120 },
    { id: '4', serialNumber: '20801', year: 2019, model: 'Challenger 350', price: 21500000, hours: 850, location: 'USA (FL)', status: 'active', daysOnMarket: 5 },
    { id: '5', serialNumber: '20444', year: 2014, model: 'Challenger 350', price: 15900000, hours: 3100, location: 'Germany', status: 'sold', daysOnMarket: 180 },
    { id: '6', serialNumber: '20902', year: 2021, model: 'Challenger 350', price: 23500000, hours: 450, location: 'USA (CA)', status: 'active', daysOnMarket: 3 },
    { id: '7', serialNumber: '20610', year: 2016, model: 'Challenger 350', price: 17200000, hours: 1900, location: 'UAE', status: 'active', daysOnMarket: 95 },
    { id: '8', serialNumber: '20755', year: 2018, model: 'Challenger 350', price: 19800000, hours: 980, location: 'USA (NY)', status: 'active', daysOnMarket: 22 },
];

export default function AircraftTable() {
    const [sortField, setSortField] = useState<keyof AircraftListing>('daysOnMarket');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Sorting logic
    const sortedData = [...MOCK_LISTINGS].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (field: keyof AircraftListing) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            sold: 'bg-gray-100 text-gray-800',
            withdrawn: 'bg-red-100 text-red-800',
        };
        const activeStyle = styles[status as keyof typeof styles] || styles.active;

        return (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${activeStyle} capitalize`}>
                {status}
            </span>
        );
    };

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 break-inside-avoid overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Market Listings</h2>
                    <p className="text-sm text-gray-600 mt-1">Current available inventory</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Serial', 'Year', 'Price', 'Hours', 'Location', 'DOM', 'Status'].map((header, idx) => {
                                const fieldMap: Record<string, keyof AircraftListing> = {
                                    'Serial': 'serialNumber',
                                    'Year': 'year',
                                    'Price': 'price',
                                    'Hours': 'hours',
                                    'Location': 'location',
                                    'DOM': 'daysOnMarket',
                                    'Status': 'status'
                                };
                                const field = fieldMap[header];

                                return (
                                    <th
                                        key={header}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                        onClick={() => handleSort(field)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {header}
                                            {sortField === field ? (
                                                <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                                            ) : (
                                                <ChevronsUpDown className="h-4 w-4 text-gray-300" />
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((aircraft) => (
                            <tr key={aircraft.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{aircraft.serialNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aircraft.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{formatCurrency(aircraft.price)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aircraft.hours.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aircraft.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aircraft.daysOnMarket} days</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={aircraft.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, MOCK_LISTINGS.length)}</span> of <span className="font-medium">{MOCK_LISTINGS.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}
