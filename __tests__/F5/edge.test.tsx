import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PriceTrendChart from '@/components/dashboard/charts/price-trend';
import { usePriceTrends } from '@/hooks/usePriceTrends';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock Hooks
jest.mock('@/hooks/useModelSelection', () => ({
    useModelSelection: jest.fn(),
}));
jest.mock('@/hooks/usePriceTrends', () => ({
    usePriceTrends: jest.fn(),
}));

// Mock Recharts
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
        LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
        Line: () => <div data-testid="chart-line" />,
        XAxis: () => <div data-testid="x-axis" />,
        YAxis: () => <div data-testid="y-axis" />,
        Tooltip: () => <div data-testid="chart-tooltip" />,
    };
});

describe('F5: Price Trends - Edge Cases', () => {
    beforeEach(() => {
        (useModelSelection as jest.Mock).mockReturnValue({ selectedModelId: 'test-id' });
    });

    it('F5.3.1 Handles empty data set', () => {
        (usePriceTrends as jest.Mock).mockReturnValue({ data: [], loading: false, error: null });
        render(<PriceTrendChart />);
        expect(screen.getByText(/No trend data available/i)).toBeInTheDocument();
    });

    it('F5.3.2 Handles loading state', () => {
        (usePriceTrends as jest.Mock).mockReturnValue({ data: null, loading: true, error: null });
        const { container } = render(<PriceTrendChart />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('F5.3.3 Handles error state', () => {
        (usePriceTrends as jest.Mock).mockReturnValue({ data: null, loading: false, error: 'API Error' });
        render(<PriceTrendChart />);
        expect(screen.getByText(/No trend data available/i)).toBeInTheDocument();
    });

    it('F5.3.4 Handles single data point', () => {
        (usePriceTrends as jest.Mock).mockReturnValue({
            data: [{ date: 'Jan', price: 100 }],
            loading: false,
            error: null
        });
        render(<PriceTrendChart />);
        expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });
});
