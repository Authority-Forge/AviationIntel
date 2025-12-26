import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import DashboardContent from '@/components/dashboard/dashboard-content';
import {
    utilizationData as mockUtilization,
    monthlyUtilization as mockMonthly,
    fleetAgeData as mockFleet,
    charterData as mockCharter,
    operatorData as mockOperator
} from '@/lib/mock-data/dashboard-data';

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

// Mock Lucide Icons (not strictly necessary if they are just SVG components, but good for isolation)
jest.mock('lucide-react', () => ({
    TrendingUp: () => <div data-testid="icon-trending-up" />,
    TrendingDown: () => <div data-testid="icon-trending-down" />,
    AlertCircle: () => <div data-testid="icon-alert-circle" />,
    CheckCircle: () => <div data-testid="icon-check-circle" />,
    Download: () => <div data-testid="icon-download" />,
    ChevronDown: () => <div data-testid="icon-chevron-down" />,
    ChevronLeft: () => <div data-testid="icon-chevron-left" />,
    ChevronRight: () => <div data-testid="icon-chevron-right" />,
    ChevronsUpDown: () => <div data-testid="icon-chevrons-up-down" />,
}));

// Mock hooks
jest.mock('@/hooks/useModelSelection', () => ({
    useModelSelection: () => ({
        selectedModelId: 'test-model-id',
        setSelectedModelId: jest.fn(),
        loading: false,
        error: null,
        models: [],
        selectedModel: { id: 'test-model-id', name: 'Test Model' }
    })
}));

jest.mock('@/hooks/useMarketMetrics', () => ({
    useMarketMetrics: () => ({
        metrics: {
            activeListings: 10,
            avgAskingPrice: 20000000,
            askingPriceVsMarket: 5.5,
            avgDaysOnMarket: 45,
            trendDirection: 'up'
        },
        loading: false,
        error: null
    })
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}));

describe('Final Dashboard Sanity Check', () => {
    it('Renders the main dashboard sections', async () => {
        // We render DashboardContent directly because testing async Server Components is tricky in Jest/RTL
        // The data fetching logic is tested separately via unit tests for dashboardService if needed
        render(
            <DashboardContent
                utilizationData={mockUtilization}
                monthlyUtilization={mockMonthly}
                fleetAgeData={mockFleet}
                charterData={mockCharter}
                operatorData={mockOperator}
            />
        );

        // Header
        expect(await screen.findByText('Bombardier Challenger 350')).toBeInTheDocument();

        // Sections
        expect(screen.getByText('Market Overview')).toBeInTheDocument();
        expect(screen.getByText('Utilization Behaviour')).toBeInTheDocument();
        expect(screen.getByText('Fleet Structure & Aging')).toBeInTheDocument();
        expect(screen.getByText('Charter Exposure & Commercialization')).toBeInTheDocument();
        // Operator Concentration is in the Market Distribution chart
        expect(screen.getByText('Operator Concentration')).toBeInTheDocument();
    });

    it('Renders all charts', async () => {
         render(
            <DashboardContent
                utilizationData={mockUtilization}
                monthlyUtilization={mockMonthly}
                fleetAgeData={mockFleet}
                charterData={mockCharter}
                operatorData={mockOperator}
            />
        );

        // We have 4 BarCharts and 1 LineChart and 1 PieChart in the final design
        // Utilization: Bar + Line
        // Fleet: Bar
        // Charter: Pie
        // Operator: Bar

        const barCharts = await screen.findAllByTestId('bar-chart');
        expect(barCharts.length).toBeGreaterThanOrEqual(3);

        const lineCharts = screen.getAllByTestId('line-chart');
        expect(lineCharts.length).toBeGreaterThanOrEqual(1);

        const pieCharts = screen.getAllByTestId('pie-chart');
        expect(pieCharts.length).toBeGreaterThanOrEqual(1);
    });
});
