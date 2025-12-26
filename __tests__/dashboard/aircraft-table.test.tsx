import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AircraftTable from '@/components/dashboard/aircraft-table/index';
import { AircraftListing } from '@/lib/schemas';

// Mock dependencies
jest.mock('lucide-react', () => ({
    ChevronDown: () => <div data-testid="chevron-down" />,
    ChevronLeft: () => <div data-testid="chevron-left" />,
    ChevronRight: () => <div data-testid="chevron-right" />,
    ChevronsUpDown: () => <div data-testid="chevrons-up-down" />,
}));

const mockListings: AircraftListing[] = [
    { id: '1', serialNumber: '10001', year: 2020, model: 'Test Model', price: 1000000, hours: 500, location: 'USA', status: 'active', daysOnMarket: 10 },
    { id: '2', serialNumber: '10002', year: 2021, model: 'Test Model', price: 2000000, hours: 200, location: 'UK', status: 'sold', daysOnMarket: 5 },
    { id: '3', serialNumber: '10003', year: 2019, model: 'Test Model', price: 1500000, hours: 800, location: 'Germany', status: 'pending', daysOnMarket: 20 },
];

describe('AircraftTable Component', () => {
    it('renders "No listings available" when listings prop is empty', () => {
        render(<AircraftTable listings={[]} />);
        expect(screen.getByText('No listings available.')).toBeInTheDocument();
    });

    it('renders the table when listings are provided', () => {
        render(<AircraftTable listings={mockListings} />);
        expect(screen.getByText('Market Listings')).toBeInTheDocument();
        expect(screen.getByText('#10001')).toBeInTheDocument();
        expect(screen.getByText('#10002')).toBeInTheDocument();
        expect(screen.getByText('#10003')).toBeInTheDocument();
    });

    it('sorts listings correctly', () => {
        render(<AircraftTable listings={mockListings} />);
        // Initial sort is likely by DaysOnMarket ascending or similar default, check code:
        // default state: sortField='daysOnMarket', sortDirection='asc'
        // Listings DOM: 10, 5, 20. Sorted asc: 5 (id 2), 10 (id 1), 20 (id 3)

        const rows = screen.getAllByRole('row');
        // Row 0 is header. Rows 1, 2, 3 are data.
        // We expect id 2 first.
        expect(rows[1]).toHaveTextContent('#10002');
        expect(rows[2]).toHaveTextContent('#10001');
        expect(rows[3]).toHaveTextContent('#10003');

        // Click on Price header to sort by price
        const priceHeader = screen.getByText('Price');
        fireEvent.click(priceHeader);

        // Sort by price (asc). Prices: 1M, 2M, 1.5M. Sorted: 1M (id 1), 1.5M (id 3), 2M (id 2)
        const rowsAfterSort = screen.getAllByRole('row');
        expect(rowsAfterSort[1]).toHaveTextContent('#10001');
        expect(rowsAfterSort[2]).toHaveTextContent('#10003');
        expect(rowsAfterSort[3]).toHaveTextContent('#10002');
    });

    it('paginates listings correctly', () => {
        // Create more listings to trigger pagination (pageSize is 5)
        const manyListings: AircraftListing[] = Array.from({ length: 7 }, (_, i) => ({
            id: `${i}`,
            serialNumber: `S${i}`,
            year: 2020,
            model: 'M',
            price: 1000,
            hours: 100,
            location: 'Loc',
            status: 'active',
            daysOnMarket: i // ensure sort order is 0, 1, 2...
        }));

        render(<AircraftTable listings={manyListings} />);

        // Should see first 5
        expect(screen.getByText('#S0')).toBeInTheDocument();
        expect(screen.getByText('#S4')).toBeInTheDocument();
        expect(screen.queryByText('#S5')).not.toBeInTheDocument();

        // Click next page
        const nextButton = screen.getAllByRole('button')[2]; // Previous, Page 1, Page 2, Next
        // Or find by aria-label "Next"?
        // The component has <span className="sr-only">Next</span>
        // Testing library might not find by role "button" easily if many buttons.
        // Let's use getByText inside the button if possible, but it is sr-only.

        // Actually, the page numbers are buttons too.
        fireEvent.click(screen.getByText('2'));

        // Now should see S5 and S6
        expect(screen.getByText('#S5')).toBeInTheDocument();
        expect(screen.getByText('#S6')).toBeInTheDocument();
        expect(screen.queryByText('#S0')).not.toBeInTheDocument();
    });
});
