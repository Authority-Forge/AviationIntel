import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MetricCard from '@/components/dashboard/metric-card';

describe('F3: Metric Cards - Display', () => {
    it('F3.1.1 Renders title and value', () => {
        render(<MetricCard title="Active Listings" value="12" change={0} trend="stable" />);
        expect(screen.getByText('Active Listings')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('F3.1.2 Formats currency correctly', () => {
        render(<MetricCard title="Avg Price" value={15000000} change={0} trend="stable" format="currency" />);
        expect(screen.getByText('$15.0M')).toBeInTheDocument();
    });

    it('F3.1.3 Renders positive trend', () => {
        render(<MetricCard title="Test" value="100" change={5.2} trend="up" />);
        // Expect green text or up icon
        const trend = screen.getByText('5.2%');
        expect(trend).toHaveClass('text-green-600');
    });

    it('F3.1.4 Renders negative trend', () => {
        render(<MetricCard title="Test" value="100" change={-3.1} trend="down" />);
        const trend = screen.getByText('3.1%'); // usually displayed as absolute with direction
        expect(trend).toHaveClass('text-red-600');
    });
});
