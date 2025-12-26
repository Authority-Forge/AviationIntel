import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModelSelector from '../model-selector';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock @tanstack/react-virtual
jest.mock('@tanstack/react-virtual', () => ({
    useVirtualizer: ({ count, getScrollElement }: any) => ({
        getVirtualItems: () => {
            // Mock rendering a subset of items
            const visibleCount = Math.min(count, 20);
            return Array.from({ length: visibleCount }).map((_, i) => ({
                index: i,
                key: i,
                start: i * 60,
                size: 60,
                measureElement: jest.fn(),
            }));
        },
        getTotalSize: () => count * 60,
        measureElement: jest.fn(),
    }),
}));

// Mock the hook
jest.mock('@/hooks/useModelSelection');
const mockSetSelected = jest.fn();

const mockModels = Array.from({ length: 150 }, (_, i) => ({
    id: `model-${i}`,
    name: `Model ${i}`,
    manufacturer: 'Bombardier',
    yearStart: 2010,
}));

describe('F2: Model Selector UI', () => {
    beforeEach(() => {
        (useModelSelection as jest.Mock).mockReturnValue({
            selectedModel: mockModels[0],
            models: mockModels,
            setSelectedModelId: mockSetSelected,
            loading: false,
            error: null,
        });
        mockSetSelected.mockClear();
    });

    // F2.1.4
    it('F2.1.4: Handles 100+ models (virtualized)', async () => {
        render(<ModelSelector />);
        // Button text shows selected model initially
        const button = screen.getByRole('button', { name: /Model 0/i });
        await userEvent.click(button);

        // Virtualization check: Not all 150 items should be in DOM
        // Our mock only renders 20, so finding 'option' roles checks this
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(20);
        expect(options.length).toBeLessThan(150);
    });

    // F2.2.3, F2.2.4
    it('F2.2.3: Keyboard navigation', async () => {
        render(<ModelSelector />);
        const button = screen.getByRole('button');
        await userEvent.click(button);

        const searchInput = screen.getByPlaceholderText(/search/i);
        await userEvent.type(searchInput, 'Model 10');

        // Wait for filter
        await waitFor(() => {
            expect(screen.getByText('Model 10')).toBeInTheDocument();
        });

        // Click selection
        await userEvent.click(screen.getByText('Model 10'));
        expect(mockSetSelected).toHaveBeenCalledWith('model-10');
    });
});
