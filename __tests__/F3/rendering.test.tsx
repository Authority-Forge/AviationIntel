import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MetricCard from '@/components/dashboard/metric-card';

describe('F3: Metric Cards - Rendering', () => {
    it('F3.1.1 Renders title and value', () => {
        render(<MetricCard title="Active Listings" value="12" />);
        expect(screen.getByText('Active Listings')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('F3.1.2 Formats simple number', () => {
        render(<MetricCard title="Count" value={1234} />);
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('F3.1.3 Formats currency (millions)', () => {
        render(<MetricCard title="Price" value={15500000} format="currency" />);
        expect(screen.getByText('$15.5M')).toBeInTheDocument();
    });

    it('F3.1.4 Formats currency (thousands)', () => {
        render(<MetricCard title="Price" value={450000} format="currency" />);
        expect(screen.getByText('$450k')).toBeInTheDocument();
    });

    it('F3.1.5 Formats percentage positive', () => {
        render(<MetricCard title="Change" value={0} change={5.2} trend="up" />);
        expect(screen.getByText('5.2%')).toBeInTheDocument();
    });

    it('F3.1.6 Formats percentage negative', () => {
        render(<MetricCard title="Change" value={0} change={-2.1} trend="down" />);
        expect(screen.getByText('2.1%')).toBeInTheDocument();
    });

    it('F3.1.7 Shows up arrow for positive trend', () => {
        const { container } = render(<MetricCard title="Trend" value={0} change={1} trend="up" />);
        expect(container.querySelector('svg')).toHaveClass('text-green-500');
    });

    it('F3.1.8 Shows down arrow for negative trend', () => {
        const { container } = render(<MetricCard title="Trend" value={0} change={-1} trend="down" />);
        expect(container.querySelector('svg')).toHaveClass('text-red-500');
    });

    it('F3.1.9 Shows minus icon for stable trend', () => {
        const { container } = render(<MetricCard title="Trend" value={0} change={0} trend="stable" />);
        expect(container.querySelector('svg')).toHaveClass('text-gray-500');
    });

    it('F3.1.10 Hides trend when change is undefined', () => {
        render(<MetricCard title="Static" value={100} />);
        // Should not find any percentage symbol
        expect(screen.queryByText('%')).not.toBeInTheDocument();
    });
});
