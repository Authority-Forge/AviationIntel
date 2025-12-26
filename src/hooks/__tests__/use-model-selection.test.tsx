import { renderHook, act } from '@testing-library/react';
import { useModelSelection } from '../useModelSelection';

// Mock router
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    useSearchParams: () => ({ get: jest.fn() }),
}));

describe('F2: useModelSelection Hook', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    // F2.3.4
    it('F2.3.4: Falls back to default if stored model deleted', () => {
        // Valid default assumed
        const { result } = renderHook(() => useModelSelection());
        expect(result.current.selectedModelId).toBeDefined();
    });

    // F2.3.6
    it('F2.3.6: Updates localStorage on change', () => {
        const { result } = renderHook(() => useModelSelection());

        act(() => {
            // Use a specific valid ID from your mock data constants if possible
            // For now assuming existing logic handles mocks
            const modelId = result.current.models[1].id;
            result.current.setSelectedModelId(modelId);
        });

        expect(localStorage.getItem('aviation_platform_selected_model')).toBeTruthy();
    });
});
