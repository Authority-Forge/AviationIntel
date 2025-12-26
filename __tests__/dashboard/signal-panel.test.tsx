
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignalPanel from '../../src/components/dashboard/signal-panel/index';

describe('SignalPanel', () => {
    it('renders the component', () => {
        render(<SignalPanel />);
        expect(screen.getByText('Risk & Transition Signals')).toBeInTheDocument();
    });

    it('filters by perspective (Buyer)', () => {
        render(<SignalPanel />);

        // Default is Buyer & Short
        // "Liquidity" is Both & Short. Should be visible.
        expect(screen.getByText('Liquidity')).toBeInTheDocument();

        // "Age Concentration" is Seller & Long. Should NOT be visible.
        expect(screen.queryByText('Age Concentration')).not.toBeInTheDocument();
    });

    it('filters by perspective (Seller)', () => {
        render(<SignalPanel />);

        // Switch to Seller
        const sellerButton = screen.getByText('Seller');
        fireEvent.click(sellerButton);

        // Switch to Long Term (to see Seller signals which are mostly long in mock data)
        const longButton = screen.getByText('Long Term');
        fireEvent.click(longButton);

        // "Age Concentration" is Seller & Long.
        expect(screen.getByText('Age Concentration')).toBeInTheDocument();

        // "Manufacturer" is Buyer & Long. Should NOT be visible.
        expect(screen.queryByText('Manufacturer')).not.toBeInTheDocument();
    });

    it('filters by timeframe (Short vs Long)', () => {
         render(<SignalPanel />);
         // Default is Short Term

         // 1: Residual Risk (long) -> Should be HIDDEN
         // 2: Liquidity (short) -> Should be VISIBLE

         expect(screen.queryByText('Residual Risk')).not.toBeInTheDocument();
         expect(screen.getByText('Liquidity')).toBeInTheDocument();

         // Switch to Long Term
         const longButton = screen.getByText('Long Term');
         fireEvent.click(longButton);

         // 1: Residual Risk (long) -> Should be VISIBLE
         // 2: Liquidity (short) -> Should be HIDDEN

         expect(screen.getByText('Residual Risk')).toBeInTheDocument();
         expect(screen.queryByText('Liquidity')).not.toBeInTheDocument();
    });
});
