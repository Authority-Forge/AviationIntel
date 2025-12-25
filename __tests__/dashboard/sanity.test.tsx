import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DashboardPage from '@/app/(dashboard)/dashboard/page';

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
}));

describe('Final Dashboard Sanity Check', () => {
    it('Renders the main dashboard sections', () => {
        render(<DashboardPage />);

        // Header
        expect(screen.getByText('Bombardier Challenger 350')).toBeInTheDocument();

        // Sections
        expect(screen.getByText('Executive Snapshot')).toBeInTheDocument();
        expect(screen.getByText('Utilization Behaviour')).toBeInTheDocument();
        expect(screen.getByText('Fleet Structure & Aging')).toBeInTheDocument();
        expect(screen.getByText('Charter Exposure & Commercialization')).toBeInTheDocument();
        expect(screen.getByText('Operator Concentration')).toBeInTheDocument();
    });

    it('Renders all charts', () => {
        render(<DashboardPage />);
        // We have 4 BarCharts and 1 LineChart and 1 PieChart in the final design
        // Utilization: Bar + Line
        // Fleet: Bar
        // Charter: Pie
        // Operator: Bar

        // Note: getAllByTestId might indicate how many of each
        const barCharts = screen.getAllByTestId('bar-chart');
        expect(barCharts.length).toBeGreaterThanOrEqual(3);

        const lineCharts = screen.getAllByTestId('line-chart');
        expect(lineCharts.length).toBeGreaterThanOrEqual(1);

        const pieCharts = screen.getAllByTestId('pie-chart');
        expect(pieCharts.length).toBeGreaterThanOrEqual(1);
    });
});
