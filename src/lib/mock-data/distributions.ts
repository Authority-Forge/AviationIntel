// Price and Days on Market distribution data
export interface PriceDistribution {
    id: string;
    modelId: string;
    bucketMin: number;
    bucketMax: number;
    count: number;
}

export interface DOMDistribution {
    id: string;
    modelId: string;
    bucketLabel: string;
    bucketOrder: number;
    count: number;
}

// Challenger 350 price distribution (Dec 2024)
export const priceDistributions: PriceDistribution[] = [
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 13000000, bucketMax: 14000000, count: 1 },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 14000000, bucketMax: 15000000, count: 1 },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 15000000, bucketMax: 16000000, count: 2 },
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 16000000, bucketMax: 17000000, count: 2 },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 17000000, bucketMax: 18000000, count: 3 },
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 18000000, bucketMax: 19000000, count: 2 },
    { id: '7', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 19000000, bucketMax: 20000000, count: 1 },
    { id: '8', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 20000000, bucketMax: 21000000, count: 1 },
    { id: '9', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketMin: 21000000, bucketMax: 23000000, count: 1 },
];

// Days on Market distribution
export const domDistributions: DOMDistribution[] = [
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '0-60', bucketOrder: 1, count: 2 },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '61-120', bucketOrder: 2, count: 3 },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '121-180', bucketOrder: 3, count: 4 },
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '181-240', bucketOrder: 4, count: 3 },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '241-300', bucketOrder: 5, count: 1 },
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', bucketLabel: '300+', bucketOrder: 6, count: 1 },
];

export const getPriceDistributionByModelId = (modelId: string): PriceDistribution[] =>
    priceDistributions.filter(d => d.modelId === modelId);

export const getDOMDistributionByModelId = (modelId: string): DOMDistribution[] =>
    domDistributions.filter(d => d.modelId === modelId).sort((a, b) => a.bucketOrder - b.bucketOrder);

export const getAveragePrice = (modelId: string): number => {
    const distributions = getPriceDistributionByModelId(modelId);
    const totalCount = distributions.reduce((sum, d) => sum + d.count, 0);
    const weightedSum = distributions.reduce((sum, d) => sum + ((d.bucketMin + d.bucketMax) / 2) * d.count, 0);
    return totalCount > 0 ? weightedSum / totalCount : 0;
};
