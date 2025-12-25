import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';

// Mock navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/dashboard',
    useRouter: () => ({ push: jest.fn() }),
}));

describe('F10: Responsive Layout - Sidebar', () => {
    it('F10.2.1 Renders navigation items', () => {
        render(<Sidebar />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        // Add more based on planned nav
    });

    it('F10.2.2 Highlights active route', () => {
        render(<Sidebar />);
        const activeLink = screen.getByText('Dashboard').closest('a');
        expect(activeLink).toHaveClass('bg-gray-800'); // Or whatever active class
    });

    // Mobile specific tests would go here or in responsive.test.tsx
});
