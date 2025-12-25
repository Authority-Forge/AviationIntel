import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import PriceDistributionChart from '@/components/dashboard/charts/price-distribution';
import { usePriceDistribution } from '@/hooks/usePriceDistribution';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock the hooks
jest.mock('@/hooks/useModelSelection', () => ({
    useModelSelection: jest.fn(),
}));

jest.mock('@/hooks/usePriceDistribution', () => ({
    usePriceDistribution: jest.fn(),
}));

// Mock Recharts to avoid canvas issues in JSDOM
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container" style={{ width: 500, height: 300 }}>{children}</div>,
        BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
        Bar: () => <div data-testid="chart-bar" />,
        XAxis: () => <div data-testid="x-axis" />,
        YAxis: () => <div data-testid="y-axis" />,
        Tooltip: () => <div data-testid="chart-tooltip" />,
    };
});

describe('F4: Price Distribution - Rendering', () => {
    beforeEach(() => {
        (useModelSelection as jest.Mock).mockReturnValue({
            selectedModelId: 'test-model-id'
        });

        (usePriceDistribution as jest.Mock).mockReturnValue({
            data: [
                { range: '$17M-$18M', count: 5, min: 17, max: 18, isPeak: true }
            ],
            loading: false,
            error: null
        });
    });

    it('F4.2.1 Renders chart container', () => {
        render(<PriceDistributionChart />);
        expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
        expect(screen.getByText('Asking Price Distribution')).toBeInTheDocument();
    });
});
