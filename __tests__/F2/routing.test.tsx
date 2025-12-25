import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock Next.js navigation with dynamic params
const mockPush = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => mockUseSearchParams(),
}));

describe('F2: Model Selector - URL Routing', () => {
    beforeEach(() => {
        localStorage.clear();
        mockPush.mockClear();
        mockUseSearchParams.mockReturnValue(new URLSearchParams());
    });

    it('F2.4.1 URL updates with model ID', async () => {
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            result.current.setSelectedModelId('550e8400-e29b-41d4-a716-446655440002');
        });

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('model=550e8400-e29b-41d4-a716-446655440002'));
    });

    it('F2.4.2 Direct URL navigation loads correct model', async () => {
        const params = new URLSearchParams();
        params.set('model', '550e8400-e29b-41d4-a716-446655440003');
        mockUseSearchParams.mockReturnValue(params);

        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440003');
        });
    });

    it('F2.4.3 Invalid model ID handling', async () => {
        const params = new URLSearchParams();
        params.set('model', '550e8400-e29b-41d4-a716-invalid');
        mockUseSearchParams.mockReturnValue(params);

        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            // Default model
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
        });
    });

    it('F2.4.4 URL params override localStorage', async () => {
        localStorage.setItem('aviation_platform_selected_model', '550e8400-e29b-41d4-a716-446655440002');

        const params = new URLSearchParams();
        params.set('model', '550e8400-e29b-41d4-a716-446655440003');
        mockUseSearchParams.mockReturnValue(params);

        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440003');
        });
    });
});
