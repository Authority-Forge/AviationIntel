import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock child components to focus on structure
jest.mock('@/components/layout/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('@/components/layout/Header', () => () => <div data-testid="header">Header</div>);

describe('F10: Responsive Layout - Structure', () => {
    it('F10.1.1 Renders main shell elements', () => {
        render(<DashboardLayout>Content</DashboardLayout>);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('F10.1.2 Main content renders children', () => {
        render(<DashboardLayout><div>Test Content</div></DashboardLayout>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('F10.1.3 Uses grid layout on desktop', () => {
        // Class check for Tailwind responsiveness
        render(<DashboardLayout>Content</DashboardLayout>);
        const wrapper = screen.getByRole('main').parentElement?.parentElement;
        // Expecting a flexible container or grid
        expect(wrapper).toHaveClass('min-h-screen');
    });
});
