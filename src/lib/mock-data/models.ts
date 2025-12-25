// Aircraft model types and data
export interface AircraftModel {
    id: string;
    name: string;
    manufacturer: string;
    category: string;
    imageUrl: string;
}

// Real data from seed.sql
export const aircraftModels: AircraftModel[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Challenger 350',
        manufacturer: 'Bombardier',
        category: 'Super Midsize',
        imageUrl: '/images/aircraft/challenger-350.jpg',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Citation Latitude',
        manufacturer: 'Cessna',
        category: 'Super Midsize',
        imageUrl: '/images/aircraft/citation-latitude.jpg',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Praetor 500',
        manufacturer: 'Embraer',
        category: 'Super Midsize',
        imageUrl: '/images/aircraft/praetor-500.jpg',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Challenger 3500',
        manufacturer: 'Bombardier',
        category: 'Super Midsize',
        imageUrl: '/images/aircraft/challenger-3500.jpg',
    },
];

// Default model ID
export const DEFAULT_MODEL_ID = '550e8400-e29b-41d4-a716-446655440001';

export const getModelById = (id: string): AircraftModel | undefined =>
    aircraftModels.find(m => m.id === id);

export const getModelsByManufacturer = (manufacturer: string): AircraftModel[] =>
    aircraftModels.filter(m => m.manufacturer === manufacturer);
