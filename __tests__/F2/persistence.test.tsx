import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useModelSelection } from '@/hooks/useModelSelection';

// Mock Next.js navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => mockSearchParams,
}));

describe('F2: Model Selector - Persistence', () => {
    beforeEach(() => {
        localStorage.clear();
        mockPush.mockClear();
        jest.clearAllMocks();
    });

    it('F2.3.1 Selection persists on page refresh', async () => {
        localStorage.setItem('aviation_platform_selected_model', '550e8400-e29b-41d4-a716-446655440002');
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440002');
        });
    });

    it('F2.3.2 Selection stored in localStorage', async () => {
        const { result } = renderHook(() => useModelSelection());
        await waitFor(() => {
            result.current.setSelectedModelId('550e8400-e29b-41d4-a716-446655440002');
        });

        expect(localStorage.getItem('aviation_platform_selected_model')).toBe('550e8400-e29b-41d4-a716-446655440002');
    });

    it('F2.3.3 Handles corrupted localStorage', async () => {
        localStorage.setItem('aviation_platform_selected_model', 'invalid-uuid-garbage');
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            // Should fall back to default
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
        });
    });

    it('F2.3.4 Falls back to default if stored model deleted', async () => {
        // Mock a deleted model ID being in storage
        localStorage.setItem('aviation_platform_selected_model', '550e8400-e29b-41d4-a716-446655449999');
        const { result } = renderHook(() => useModelSelection());

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
        });
    });

    it('F2.3.5 Syncs selection across tabs', async () => {
        const { result } = renderHook(() => useModelSelection());

        // Simulate storage event from another tab
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'aviation_platform_selected_model',
            newValue: '550e8400-e29b-41d4-a716-446655440003',
            storageArea: localStorage
        }));

        await waitFor(() => {
            expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440003');
        });
    });

    it('F2.3.6 Clears selection on logout', () => {
        // This would typically involve an auth hook/context integration
        // For this unit test, manual removal triggers fallback on next mount
        localStorage.removeItem('aviation_platform_selected_model');
        const { result } = renderHook(() => useModelSelection());
        // Should use default
        expect(result.current.selectedModelId).toBe('550e8400-e29b-41d4-a716-446655440001');
    });
});
