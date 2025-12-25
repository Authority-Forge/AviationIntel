import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

// Mock Model Selector
jest.mock('@/components/dashboard/model-selector', () => () => <div data-testid="model-selector">Model Selector</div>);

describe('F10: Responsive Layout - Header', () => {
    it('F10.3.1 Renders Header content', () => {
        render(<Header />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('F10.3.2 Contains Model Selector (F2 integration)', () => {
        render(<Header />);
        expect(screen.getByTestId('model-selector')).toBeInTheDocument();
    });

    it('F10.3.3 Shows user profile/actions', () => {
        render(<Header />);
        // Expect user avatar or placeholder
        expect(screen.getByText('JD')).toBeInTheDocument(); // Initials or similar
    });
});
