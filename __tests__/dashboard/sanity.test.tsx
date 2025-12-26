import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DashboardContent from '@/components/dashboard/dashboard-content';
import {
    utilizationData,
    monthlyUtilization,
    fleetAgeData,
    charterData,
    operatorData
} from '@/lib/mock-data/dashboard-data';
import { getLatestMetrics } from '@/lib/mock-data/metrics';

// Mock Recharts
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
        BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
        LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
        PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
        Bar: () => <div data-testid="chart-bar" />,
        Line: () => <div data-testid="chart-line" />,
        Pie: () => <div data-testid="chart-pie" />,
        XAxis: () => <div data-testid="x-axis" />,
        YAxis: () => <div data-testid="y-axis" />,
        Tooltip: () => <div data-testid="chart-tooltip" />,
        Legend: () => <div data-testid="chart-legend" />,
        Cell: () => <div data-testid="chart-cell" />,
        CartesianGrid: () => <div data-testid="chart-grid" />,
    };
});

// Mock Lucide Icons using a Proxy to handle any icon import
jest.mock('lucide-react', () => {
    return new Proxy({}, {
        get: (target, prop) => {
            // Return a component for any property access
            const IconMock = (props: any) => <div data-testid={`icon-${String(prop)}`} {...props} />;
            return IconMock;
        }
    });
});

// Mock react-to-print
jest.mock('react-to-print', () => ({
    useReactToPrint: jest.fn(() => jest.fn()),
}));

describe('Final Dashboard Sanity Check', () => {
    const mockMarketMetrics = getLatestMetrics('550e8400-e29b-41d4-a716-446655440001');

    it('Renders the main dashboard sections', () => {
        render(
            <DashboardContent
                utilizationData={utilizationData}
                monthlyUtilization={monthlyUtilization}
                fleetAgeData={fleetAgeData}
                charterData={charterData}
                operatorData={operatorData}
                marketMetrics={mockMarketMetrics}
            />
        );

        // Header
        expect(screen.getByText('Bombardier Challenger 350')).toBeInTheDocument();

        // Sections
        expect(screen.getByText('Market Overview')).toBeInTheDocument();

        // Check specific chart components existence by testid (mocked)
        expect(screen.getAllByTestId('bar-chart').length).toBeGreaterThan(0);
    });

    it('Renders all charts', () => {
        render(
            <DashboardContent
                utilizationData={utilizationData}
                monthlyUtilization={monthlyUtilization}
                fleetAgeData={fleetAgeData}
                charterData={charterData}
                operatorData={operatorData}
                marketMetrics={mockMarketMetrics}
            />
        );

        const barCharts = screen.getAllByTestId('bar-chart');
        expect(barCharts.length).toBeGreaterThanOrEqual(1);

        const responsiveContainers = screen.getAllByTestId('responsive-container');
        expect(responsiveContainers.length).toBeGreaterThan(0);
    });
});
