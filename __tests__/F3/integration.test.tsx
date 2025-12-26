import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MetricsGrid from '@/components/dashboard/metrics-grid';
import { MarketMetric } from '@/lib/schemas';

// Mock hook dependencies - No longer needed for MetricsGrid as it's a pure component now
// But we might need to mock useModelSelection if it's still used somewhere,
// but MetricsGrid was refactored to remove it.

const mockMetrics: MarketMetric = {
    id: '123',
    modelId: '456',
    date: '2024-01-01',
    activeListings: 15,
    avgAskingPrice: 20000000,
    avgDaysOnMarket: 100,
    askingPriceVsMarket: 5.5,
    trendDirection: 'up',
    marketActivityScore: 80,
    residualValueStrength: 75
};

describe('F3: Metric Cards - Integration', () => {
    it('F3.2.1 Renders MetricsGrid container', () => {
        const { container } = render(<MetricsGrid metrics={mockMetrics} />);
        expect(container.querySelector('dl')).toBeInTheDocument();
    });

    it('F3.2.2 Shows core metrics (Listings, Price, DOM)', () => {
        render(<MetricsGrid metrics={mockMetrics} />);
        expect(screen.getByText('Active Listings')).toBeInTheDocument();
        expect(screen.getByText('Avg Asking Price')).toBeInTheDocument();
        expect(screen.getByText('Days on Market')).toBeInTheDocument();
    });

    it('F3.2.3 Displays data from props', () => {
        render(<MetricsGrid metrics={mockMetrics} />);
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('$20.0M')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('F3.2.5 Handles loading/empty state', () => {
        render(<MetricsGrid metrics={undefined} />);
        // Should show skeleton or nothing
        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    // Error state handling was removed from MetricsGrid as it is now a presentation component.
    // Errors are handled by parent or by passing null/undefined which triggers loading/skeleton.
    // If we want error state, we'd pass an error prop, but current implementation doesn't support it.
    // So we skip error test or adapt it if we add error prop.

    it('F3.2.8 Prevents layout shift during loading', () => {
        const { container } = render(<MetricsGrid metrics={undefined} />);
        expect(container.firstChild).toHaveClass('grid');
    });

    it('F3.2.9 Shows all 3 cards in grid', () => {
        render(<MetricsGrid metrics={mockMetrics} />);
        expect(screen.getAllByText(/Active|Price|Days/).length).toBe(3);
    });
});
