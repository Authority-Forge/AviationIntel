import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ModelSelector from '@/components/dashboard/model-selector';

// Mock hook to control return values
jest.mock('@/hooks/useModelSelection', () => ({
    useModelSelection: jest.fn(() => ({
        selectedModelId: '550e8400-e29b-41d4-a716-446655440001',
        setSelectedModelId: jest.fn(),
        models: [
            { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Challenger 350', manufacturer: 'Bombardier' },
            { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Citation Latitude', manufacturer: 'Cessna' },
            { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Praetor 500', manufacturer: 'Embraer' },
            { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Challenger 3500', manufacturer: 'Bombardier' },
        ],
        loading: false,
        error: null,
        selectedModel: { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Challenger 350', manufacturer: 'Bombardier' },
    })),
}));

describe('F2: Model Selector - Rendering', () => {
    it('F2.1.1 Renders all available models', () => {
        render(<ModelSelector />);
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(4);
    });

    it('F2.1.2 Shows model name and manufacturer', () => {
        render(<ModelSelector />);
        expect(screen.getByText('Bombardier Challenger 350')).toBeInTheDocument();
    });

    // Skipped edge cases
    it.skip('F2.1.3 Handles 0 models (empty state)', () => { });
    it.skip('F2.1.4 Handles 100+ models (virtualized)', () => { });
    it.skip('F2.1.5 Sorts models alphabetically', () => { });
    it.skip('F2.1.6 Groups models by manufacturer', () => { });
    it.skip('F2.1.7 Shows loading skeleton while fetching', () => { });
    it.skip('F2.1.8 Handles API error gracefully', () => { });
    it.skip('F2.1.9 Accessible via keyboard', () => { });
    it.skip('F2.1.10 Screen reader announces options', () => { });
});
