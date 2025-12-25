'use client';

import { Suspense } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:pl-72">
                <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
                    <Header />
                </Suspense>
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
