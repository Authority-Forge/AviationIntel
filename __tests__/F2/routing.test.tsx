import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock Next.js navigation with dynamic params
let mockSearchParams = new URLSearchParams();
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => mockSearchParams,
}));

describe('F2: Model Selector - URL Routing', () => {
    beforeEach(() => {
        mockSearchParams = new URLSearchParams();
        mockPush.mockClear();
    });

    it('F2.4.1 URL updates with model ID', async () => {
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            result.current.setSelectedModelId('550e8400-e29b-41d4-a716-446655440002');
        });

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('model=550e8400-e29b-41d4-a716-446655440002'));
    });

    it('F2.4.2 Direct URL navigation loads correct model', async () => {
        mockSearchParams.set('model', '550e8400-e29b-41d4-a716-446655440003');
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440003');
        });
    });

    it.skip('F2.4.3 Invalid model ID shows 404', () => { });
    it.skip('F2.4.4 URL params override localStorage', () => { });
});
