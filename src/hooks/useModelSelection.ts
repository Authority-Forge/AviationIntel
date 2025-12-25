import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AircraftModel, aircraftModels, DEFAULT_MODEL_ID } from '@/lib/mock-data/models';
import { z } from 'zod';
import { ModelSelectionSchema } from '@/lib/schemas';

const STORAGE_KEY = 'aviation_platform_selected_model';

export function useModelSelection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isMounted = useRef(true); // Prevent state updates on unmount (memory leak prevention)

    // State for selected model ID
    const [selectedModelId, setSelectedModelId] = useState<string>(DEFAULT_MODEL_ID);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        try {
            // 1. Check URL first
            const urlModelId = searchParams.get('model');
            // SECURITY: Sanitize input with Zod
            const urlValidation = ModelSelectionSchema.safeParse(urlModelId);

            // 2. Check localStorage if no valid URL param
            // SECURITY: Validate storage content to prevent injections
            const storedModelId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
            const storageValidation = ModelSelectionSchema.safeParse(storedModelId);

            // 3. Determine initial model
            let initialId = DEFAULT_MODEL_ID;

            if (urlValidation.success && aircraftModels.find(m => m.id === urlValidation.data)) {
                initialId = urlValidation.data;
            } else if (storageValidation.success && aircraftModels.find(m => m.id === storageValidation.data)) {
                initialId = storageValidation.data;
            }

            if (isMounted.current) {
                setSelectedModelId(initialId);
                setLoading(false);
            }
        } catch (e) {
            // SECURITY: Generic error logging, no PII
            console.error('Error determining model selection');
            if (isMounted.current) {
                setError('Failed to load selection');
                setLoading(false);
            }
        }

        // Listen for storage events (cross-tab sync)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                // Validate new value
                const validation = ModelSelectionSchema.safeParse(e.newValue);
                if (validation.success && aircraftModels.find(m => m.id === validation.data)) {
                    setSelectedModelId(validation.data);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            isMounted.current = false;
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [searchParams]);

    // Handle selection change
    const handleModelChange = (modelId: string) => {
        // SECURITY: Validate input before processing
        const validation = ModelSelectionSchema.safeParse(modelId);
        if (!validation.success) {
            console.warn('Invalid model selection attempt');
            return;
        }

        // Validate model exists in allowed set
        if (!aircraftModels.find(m => m.id === modelId)) {
            setError(`Invalid model ID`);
            return;
        }

        if (isMounted.current) {
            setSelectedModelId(modelId);
        }

        // Update localStorage
        try {
            localStorage.setItem(STORAGE_KEY, modelId);
        } catch (e) {
            console.error('Storage quota exceeded or disabled');
        }

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('model', modelId);
        router.push(`?${params.toString()}`);
    };

    return {
        selectedModelId,
        setSelectedModelId: handleModelChange,
        models: aircraftModels,
        loading,
        error,
        selectedModel: aircraftModels.find(m => m.id === selectedModelId)
    };
}
