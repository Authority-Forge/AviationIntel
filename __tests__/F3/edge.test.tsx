import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MetricCard from '@/components/dashboard/metric-card';

describe('F3: Metric Cards - Edge Cases', () => {
    it('F3.3.1 Handles null value gracefully', () => {
        render(<MetricCard title="Null Test" value={null as any} />); // Force null
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('F3.3.2 Handles undefined value gracefully', () => {
        render(<MetricCard title="Undef Test" value={undefined as any} />);
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('F3.3.3 Handles zero value validly', () => {
        render(<MetricCard title="Zero Test" value={0} />);
        expect(screen.getByText('0')).toBeInTheDocument(); // Should render 0, not -
    });

    it('F3.3.4 Handles extremely large numbers', () => {
        render(<MetricCard title="Big" value={1000000000000} format="currency" />);
        expect(screen.getByText('$1.0T')).toBeInTheDocument(); // Trillions? Or just big M/B
    });

    it('F3.3.5 Handles negative values (not trend)', () => {
        render(<MetricCard title="Loss" value={-5000} format="currency" />);
        expect(screen.getByText('-$5k')).toBeInTheDocument();
    });

    it('F3.3.6 Handles NaN change value', () => {
        render(<MetricCard title="NaN Change" value={100} change={NaN} />);
        expect(screen.queryByText('NaN')).not.toBeInTheDocument();
    });

    it('F3.3.7 Handles Infinite change value', () => {
        render(<MetricCard title="Inf Change" value={100} change={Infinity} />);
        expect(screen.queryByText('Infinity')).not.toBeInTheDocument();
    });

    it('F3.3.8 Truncates extremely long titles', () => {
        const longTitle = "Very Long Metric Title That Should Truncate In The UI To Avoid Breaking Layout";
        render(<MetricCard title={longTitle} value={100} />);
        const titleEl = screen.getByText(longTitle);
        expect(titleEl).toHaveClass('truncate');
    });

    it('F3.3.9 Handles unknown trend direction', () => {
        render(<MetricCard title="Unknown" value={100} trend={'spiral' as any} change={5} />);
        // Should fallback to neutral
        expect(screen.queryByTestId('trend-icon')).toBeInTheDocument();
    });

    it('F3.3.10 Handles mixed types (string value)', () => {
        render(<MetricCard title="String" value="custom-string" />);
        expect(screen.getByText('custom-string')).toBeInTheDocument();
    });
});
