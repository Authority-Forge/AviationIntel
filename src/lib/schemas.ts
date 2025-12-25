import { z } from 'zod';

// Aircraft Model Schema
export const AircraftModelSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    manufacturer: z.string().min(1),
    category: z.string(),
    imageUrl: z.string().url().optional().or(z.string().startsWith('/')),
});

export type AircraftModel = z.infer<typeof AircraftModelSchema>;

// Selection Schema (for URL/LocalStorage)
export const ModelSelectionSchema = z.string().uuid();
