import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { aircraftModels, DEFAULT_MODEL_ID } from '@/lib/mock-data/models';
import { z } from 'zod';
import { aircraftModelSchema } from '@/lib/schemas/model';

const STORAGE_KEY = 'aviation_platform_selected_model';

// Validation schema for singular model ID (UUID)
const ModelIdSchema = z.string().uuid();

export function useModelSelection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isMounted = useRef(true);

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
            const urlValidation = ModelIdSchema.safeParse(urlModelId);

            // 2. Check localStorage
            const storedModelId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
            const storageValidation = ModelIdSchema.safeParse(storedModelId);

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
            console.error('Error determining model selection');
            if (isMounted.current) {
                setError('Failed to load selection');
                setLoading(false);
            }
        }

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                const validation = ModelIdSchema.safeParse(e.newValue);
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

    const handleModelChange = (modelId: string) => {
        const validation = ModelIdSchema.safeParse(modelId);
        if (!validation.success) {
            console.warn('Invalid model selection attempt');
            return;
        }

        // Verify model exists in our list (using strict mock data source)
        if (!aircraftModels.find(m => m.id === modelId)) {
            setError('Invalid model ID');
            return;
        }

        if (isMounted.current) {
            setSelectedModelId(modelId);
        }

        try {
            localStorage.setItem(STORAGE_KEY, modelId);
        } catch (e) {
            console.error('Storage quota exceeded or disabled');
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set('model', modelId);
        router.push(`?${params.toString()}`);
    };

    return {
        selectedModelId,
        setSelectedModelId: handleModelChange,
        models: aircraftModels, // Pass raw models, component can filter
        loading,
        error,
        selectedModel: aircraftModels.find(m => m.id === selectedModelId)
    };
}
