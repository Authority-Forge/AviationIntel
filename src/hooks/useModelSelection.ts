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

    // 1. Source of truth is the URL
    const urlModelId = searchParams.get('model');
    const urlValidation = ModelIdSchema.safeParse(urlModelId);

    // 2. Determine selected ID
    let selectedModelId = DEFAULT_MODEL_ID;
    if (urlValidation.success && aircraftModels.some(m => m.id === urlValidation.data)) {
        selectedModelId = urlValidation.data;
    }

    // 3. Sync with localStorage on change (via handleModelChange)
    const handleModelChange = (modelId: string) => {
        const validation = ModelIdSchema.safeParse(modelId);
        if (!validation.success) return;

        if (!aircraftModels.some(m => m.id === modelId)) return;

        // Save to storage for next session
        try {
            localStorage.setItem(STORAGE_KEY, modelId);
        } catch (e) { }

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('model', modelId);
        router.push(`?${params.toString()}`);
    };

    // 4. Initial sync: if URL is empty, try localStorage
    useEffect(() => {
        if (!urlModelId) {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && aircraftModels.some(m => m.id === stored)) {
                handleModelChange(stored);
            }
        }
    }, []); // Only on mount

    return {
        selectedModelId,
        setSelectedModelId: handleModelChange,
        models: aircraftModels,
        loading: false,
        error: null,
        selectedModel: aircraftModels.find(m => m.id === selectedModelId)
    };
}
