// Market metrics - time series data
export type TrendDirection = 'up' | 'down' | 'stable';

export interface MarketMetric {
    id: string;
    modelId: string;
    date: string;
    askingPriceVsMarket: number;
    residualValueStrength: number;
    marketActivityScore: number;
    avgAskingPrice: number;
    avgDaysOnMarket: number;
    activeListings: number;
    trendDirection: TrendDirection;
}

// Challenger 350 monthly data 2024 (from seed.sql)
export const marketMetrics: MarketMetric[] = [
    { id: '123e4567-e89b-12d3-a456-426614174001', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-01-01', askingPriceVsMarket: -1.8, residualValueStrength: 72, marketActivityScore: 68, avgAskingPrice: 19200000, avgDaysOnMarket: 195, activeListings: 11, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174002', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-02-01', askingPriceVsMarket: -2.1, residualValueStrength: 71, marketActivityScore: 70, avgAskingPrice: 19000000, avgDaysOnMarket: 198, activeListings: 12, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174003', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-03-01', askingPriceVsMarket: -2.5, residualValueStrength: 70, marketActivityScore: 72, avgAskingPrice: 18800000, avgDaysOnMarket: 202, activeListings: 12, trendDirection: 'down' },
    { id: '123e4567-e89b-12d3-a456-426614174004', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-04-01', askingPriceVsMarket: -2.8, residualValueStrength: 69, marketActivityScore: 71, avgAskingPrice: 18600000, avgDaysOnMarket: 205, activeListings: 13, trendDirection: 'down' },
    { id: '123e4567-e89b-12d3-a456-426614174005', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-05-01', askingPriceVsMarket: -2.9, residualValueStrength: 68, marketActivityScore: 73, avgAskingPrice: 18500000, avgDaysOnMarket: 207, activeListings: 13, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174006', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-06-01', askingPriceVsMarket: -3.0, residualValueStrength: 68, marketActivityScore: 74, avgAskingPrice: 18400000, avgDaysOnMarket: 210, activeListings: 14, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174007', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-07-01', askingPriceVsMarket: -2.8, residualValueStrength: 68, marketActivityScore: 75, avgAskingPrice: 18500000, avgDaysOnMarket: 208, activeListings: 14, trendDirection: 'up' },
    { id: '123e4567-e89b-12d3-a456-426614174008', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-08-01', askingPriceVsMarket: -2.5, residualValueStrength: 69, marketActivityScore: 76, avgAskingPrice: 18600000, avgDaysOnMarket: 205, activeListings: 13, trendDirection: 'up' },
    { id: '123e4567-e89b-12d3-a456-426614174009', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-09-01', askingPriceVsMarket: -2.4, residualValueStrength: 69, marketActivityScore: 75, avgAskingPrice: 18700000, avgDaysOnMarket: 207, activeListings: 14, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174010', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-10-01', askingPriceVsMarket: -2.6, residualValueStrength: 68, marketActivityScore: 74, avgAskingPrice: 18500000, avgDaysOnMarket: 210, activeListings: 15, trendDirection: 'down' },
    { id: '123e4567-e89b-12d3-a456-426614174011', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-11-01', askingPriceVsMarket: -2.7, residualValueStrength: 68, marketActivityScore: 73, avgAskingPrice: 18400000, avgDaysOnMarket: 212, activeListings: 14, trendDirection: 'stable' },
    { id: '123e4567-e89b-12d3-a456-426614174012', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-12-01', askingPriceVsMarket: -2.8, residualValueStrength: 68, marketActivityScore: 72, avgAskingPrice: 18500000, avgDaysOnMarket: 207, activeListings: 14, trendDirection: 'stable' },
    // Citation Latitude - Q4 2024
    { id: '123e4567-e89b-12d3-a456-426614174013', modelId: '550e8400-e29b-41d4-a716-446655440002', date: '2024-12-01', askingPriceVsMarket: -1.2, residualValueStrength: 75, marketActivityScore: 65, avgAskingPrice: 14500000, avgDaysOnMarket: 185, activeListings: 8, trendDirection: 'stable' },
    // Praetor 500 - Q4 2024
    { id: '123e4567-e89b-12d3-a456-426614174014', modelId: '550e8400-e29b-41d4-a716-446655440003', date: '2024-12-01', askingPriceVsMarket: 1.5, residualValueStrength: 82, marketActivityScore: 58, avgAskingPrice: 17200000, avgDaysOnMarket: 145, activeListings: 4, trendDirection: 'up' },
];

export const getLatestMetrics = (modelId: string): MarketMetric | undefined =>
    marketMetrics
        .filter(m => m.modelId === modelId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

export const getMetricsByModelId = (modelId: string): MarketMetric[] =>
    marketMetrics.filter(m => m.modelId === modelId);

// Feature 4: Price Distribution
export interface DistributionBucket {
    range: string;
    count: number;
    min: number;
    max: number;
}

export const getPriceDistribution = (modelId: string): DistributionBucket[] => {
    // Deterministic mock data based on modelId
    if (modelId === '550e8400-e29b-41d4-a716-446655440001') { // Challenger 350
        return [
            { range: '$17M - $18M', count: 2, min: 17000000, max: 18000000 },
            { range: '$18M - $19M', count: 8, min: 18000000, max: 19000000 }, // Peak
            { range: '$19M - $20M', count: 3, min: 19000000, max: 20000000 },
        ];
    }
    // Default fallback
    return [
        { range: '$14M - $15M', count: 3, min: 14000000, max: 15000000 },
        { range: '$15M - $16M', count: 5, min: 15000000, max: 16000000 },
        { range: '$16M - $17M', count: 2, min: 16000000, max: 17000000 },
    ];
};

// Feature 5: Price Trends
export interface PricePoint {
    date: string;
    price: number;
    volume?: number;
}

export const getPriceHistory = (modelId: string): PricePoint[] => {
    // Return last 12 months based on main metrics
    const metrics = marketMetrics
        .filter(m => m.modelId === modelId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ascending for chart

    if (metrics.length > 0) {
        return metrics.map(m => ({
            date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            price: m.avgAskingPrice,
            volume: m.activeListings
        }));
    }

    return [];
}

export const getDaysOnMarketChange = (modelId: string): number => {
    const sortedMetrics = marketMetrics
        .filter(m => m.modelId === modelId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedMetrics.length < 2) return 0;

    const current = sortedMetrics[0].avgDaysOnMarket;
    const previous = sortedMetrics[1].avgDaysOnMarket;

    if (previous === 0) return 0;

    return ((current - previous) / previous) * 100;
};
