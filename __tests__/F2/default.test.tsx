import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock empty defaults
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    useSearchParams: () => new URLSearchParams(),
}));

describe('F2: Model Selector - Default Selection', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('F2.5.1 Defaults to Challenger 350 on first visit', async () => {
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            // Challenger 350 ID
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
        });
    });

    it('F2.5.2 Default used when no stored preference', async () => {
        // Explicitly null storage
        Object.defineProperty(window, 'localStorage', {
            value: { getItem: jest.fn(() => null) },
            writable: true
        });

        const { result } = renderHook(() => useModelSelection());
        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
        });
    });
});
