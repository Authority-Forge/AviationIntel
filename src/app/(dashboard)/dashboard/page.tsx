import React from 'react';
import DashboardContent from '@/components/dashboard/dashboard-content';
import { dashboardService } from '@/services/dashboard';
import { sanitizeError } from '@/lib/utils/logger';
import {
    utilizationData as mockUtilization,
    monthlyUtilization as mockMonthly,
    fleetAgeData as mockFleet,
    charterData as mockCharter,
    operatorData as mockOperator
} from '@/lib/mock-data/dashboard-data';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    let utilizationData = mockUtilization;
    let monthlyUtilization = mockMonthly;
    let fleetAgeData = mockFleet;
    let charterData = mockCharter;
    let operatorData = mockOperator;

    try {
        const isConnected = await dashboardService.checkHealth();

        if (isConnected) {
            const [util, month, fleet, charter, operator] = await Promise.all([
                dashboardService.getUtilization(),
                dashboardService.getMonthlyUtilization(),
                dashboardService.getFleetAge(),
                dashboardService.getCharterMix(),
                dashboardService.getOperatorConcentration()
            ]);

            utilizationData = util;
            monthlyUtilization = month;
            fleetAgeData = fleet;
            charterData = charter;
            operatorData = operator;
        }
    } catch (error) {
        console.warn('Supabase Connection Failed: Using Mock Data Fallback', sanitizeError(error));
        // Proceed with mocks
    }

    return (
        <DashboardContent
            utilizationData={utilizationData}
            monthlyUtilization={monthlyUtilization}
            fleetAgeData={fleetAgeData}
            charterData={charterData}
            operatorData={operatorData}
        />
    );
}
