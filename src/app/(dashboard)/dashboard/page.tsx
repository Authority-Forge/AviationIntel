import React from 'react';
import DashboardContent from '@/components/dashboard/dashboard-content';
import { dashboardService } from '@/services/dashboard';
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
        const [util, month, fleet, charter, operator] = await Promise.all([
            dashboardService.getUtilization(),
            dashboardService.getMonthlyUtilization(),
            dashboardService.getFleetAge(),
            dashboardService.getCharterMix(),
            dashboardService.getOperatorConcentration()
        ]);

        // If Supabase returns empty arrays (e.g. no connection or no data), keep mocks for now
        // In production we would check specifically for connection presence
        if (util.length > 0) utilizationData = util;
        if (month.length > 0) monthlyUtilization = month;
        if (fleet.length > 0) fleetAgeData = fleet;
        if (charter.length > 0) charterData = charter;
        if (operator.length > 0) operatorData = operator;

    } catch (error) {
        console.warn('Supabase Connection Failed: Using Mock Data Fallback', error);
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
