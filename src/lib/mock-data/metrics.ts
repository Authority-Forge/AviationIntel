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
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-01-01', askingPriceVsMarket: -1.8, residualValueStrength: 72, marketActivityScore: 68, avgAskingPrice: 19200000, avgDaysOnMarket: 195, activeListings: 11, trendDirection: 'stable' },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-02-01', askingPriceVsMarket: -2.1, residualValueStrength: 71, marketActivityScore: 70, avgAskingPrice: 19000000, avgDaysOnMarket: 198, activeListings: 12, trendDirection: 'stable' },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-03-01', askingPriceVsMarket: -2.5, residualValueStrength: 70, marketActivityScore: 72, avgAskingPrice: 18800000, avgDaysOnMarket: 202, activeListings: 12, trendDirection: 'down' },
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-04-01', askingPriceVsMarket: -2.8, residualValueStrength: 69, marketActivityScore: 71, avgAskingPrice: 18600000, avgDaysOnMarket: 205, activeListings: 13, trendDirection: 'down' },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-05-01', askingPriceVsMarket: -2.9, residualValueStrength: 68, marketActivityScore: 73, avgAskingPrice: 18500000, avgDaysOnMarket: 207, activeListings: 13, trendDirection: 'stable' },
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-06-01', askingPriceVsMarket: -3.0, residualValueStrength: 68, marketActivityScore: 74, avgAskingPrice: 18400000, avgDaysOnMarket: 210, activeListings: 14, trendDirection: 'stable' },
    { id: '7', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-07-01', askingPriceVsMarket: -2.8, residualValueStrength: 68, marketActivityScore: 75, avgAskingPrice: 18500000, avgDaysOnMarket: 208, activeListings: 14, trendDirection: 'up' },
    { id: '8', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-08-01', askingPriceVsMarket: -2.5, residualValueStrength: 69, marketActivityScore: 76, avgAskingPrice: 18600000, avgDaysOnMarket: 205, activeListings: 13, trendDirection: 'up' },
    { id: '9', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-09-01', askingPriceVsMarket: -2.4, residualValueStrength: 69, marketActivityScore: 75, avgAskingPrice: 18700000, avgDaysOnMarket: 207, activeListings: 14, trendDirection: 'stable' },
    { id: '10', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-10-01', askingPriceVsMarket: -2.6, residualValueStrength: 68, marketActivityScore: 74, avgAskingPrice: 18500000, avgDaysOnMarket: 210, activeListings: 15, trendDirection: 'down' },
    { id: '11', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-11-01', askingPriceVsMarket: -2.7, residualValueStrength: 68, marketActivityScore: 73, avgAskingPrice: 18400000, avgDaysOnMarket: 212, activeListings: 14, trendDirection: 'stable' },
    { id: '12', modelId: '550e8400-e29b-41d4-a716-446655440001', date: '2024-12-01', askingPriceVsMarket: -2.8, residualValueStrength: 68, marketActivityScore: 72, avgAskingPrice: 18500000, avgDaysOnMarket: 207, activeListings: 14, trendDirection: 'stable' },
    // Citation Latitude - Q4 2024
    { id: '13', modelId: '550e8400-e29b-41d4-a716-446655440002', date: '2024-12-01', askingPriceVsMarket: -1.2, residualValueStrength: 75, marketActivityScore: 65, avgAskingPrice: 14500000, avgDaysOnMarket: 185, activeListings: 8, trendDirection: 'stable' },
    // Praetor 500 - Q4 2024
    { id: '14', modelId: '550e8400-e29b-41d4-a716-446655440003', date: '2024-12-01', askingPriceVsMarket: 1.5, residualValueStrength: 82, marketActivityScore: 58, avgAskingPrice: 17200000, avgDaysOnMarket: 145, activeListings: 4, trendDirection: 'up' },
];

export const getLatestMetrics = (modelId: string): MarketMetric | undefined =>
    marketMetrics
        .filter(m => m.modelId === modelId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

export const getMetricsByModelId = (modelId: string): MarketMetric[] =>
    marketMetrics.filter(m => m.modelId === modelId);
