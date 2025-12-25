// Historical price trends with event markers
export interface PriceTrend {
    id: string;
    modelId: string;
    date: string;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
    sampleSize: number;
    eventMarker: string | null;
}

// Challenger 350 price trends 2020-2024 (from seed.sql)
export const priceTrends: PriceTrend[] = [
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2020-01-01', avgPrice: 20500000, minPrice: 16000000, maxPrice: 24000000, sampleSize: 8, eventMarker: null },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2020-06-01', avgPrice: 20800000, minPrice: 16500000, maxPrice: 24500000, sampleSize: 6, eventMarker: 'COVID Impact' },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2021-01-01', avgPrice: 21500000, minPrice: 17000000, maxPrice: 25000000, sampleSize: 3, eventMarker: 'Supply Shortage' },
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2021-06-01', avgPrice: 22500000, minPrice: 18000000, maxPrice: 26000000, sampleSize: 4, eventMarker: null },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2022-01-01', avgPrice: 23000000, minPrice: 19000000, maxPrice: 27000000, sampleSize: 5, eventMarker: 'Peak Prices' },
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2022-06-01', avgPrice: 22000000, minPrice: 18000000, maxPrice: 26000000, sampleSize: 7, eventMarker: 'CL3500 Launch' },
    { id: '7', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2023-01-01', avgPrice: 20500000, minPrice: 17000000, maxPrice: 24000000, sampleSize: 10, eventMarker: 'Market Correction' },
    { id: '8', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2023-06-01', avgPrice: 19500000, minPrice: 16000000, maxPrice: 23000000, sampleSize: 12, eventMarker: null },
    { id: '9', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-01-01', avgPrice: 19200000, minPrice: 15500000, maxPrice: 23000000, sampleSize: 11, eventMarker: null },
    { id: '10', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-06-01', avgPrice: 18500000, minPrice: 15000000, maxPrice: 22000000, sampleSize: 14, eventMarker: 'Stabilizing' },
    { id: '11', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-12-01', avgPrice: 18500000, minPrice: 13000000, maxPrice: 23000000, sampleSize: 14, eventMarker: null },
];

export const getTrendsByModelId = (modelId: string): PriceTrend[] =>
    priceTrends
        .filter(t => t.modelId === modelId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getEventsForModel = (modelId: string): PriceTrend[] =>
    priceTrends.filter(t => t.modelId === modelId && t.eventMarker !== null);
