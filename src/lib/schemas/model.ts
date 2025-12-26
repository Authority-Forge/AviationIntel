import { z } from 'zod';

export const aircraftModelSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    manufacturer: z.string().min(1),
    category: z.string().min(1), // Added category
    yearStart: z.number().int().min(1900),
    yearEnd: z.number().int().optional(),
    image: z.string().url().optional(),
    interiorImage: z.string().url().optional(),
    cockpitImage: z.string().url().optional(),
    layoutImage: z.string().url().optional(),
    specImage: z.string().url().optional(),
    type: z.enum(['Jet', 'Turboprop', 'Piston']).optional(), // Adjust based on actual data
});

export type AircraftModel = z.infer<typeof aircraftModelSchema>;

export const modelListSchema = z.array(aircraftModelSchema);
