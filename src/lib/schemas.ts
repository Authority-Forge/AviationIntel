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

// Feature 3: Market Metrics
export const MarketMetricSchema = z.object({
    id: z.string().uuid(),
    modelId: z.string().uuid(),
    date: z.string(), // ISO date
    askingPriceVsMarket: z.number(),
    residualValueStrength: z.number().min(0).max(100),
    marketActivityScore: z.number().min(0).max(100),
    avgAskingPrice: z.number().nonnegative(),
    avgDaysOnMarket: z.number().nonnegative(),
    activeListings: z.number().int().nonnegative(),
    trendDirection: z.enum(['up', 'down', 'stable']),
});

export type MarketMetric = z.infer<typeof MarketMetricSchema>;

// Feature 4: Price Distribution
export const PriceBucketSchema = z.object({
    range: z.string(),
    count: z.number().int().nonnegative(),
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
});

export const PriceDistributionSchema = z.array(PriceBucketSchema);
export type PriceBucket = z.infer<typeof PriceBucketSchema>;

// Feature 5: Price Trends
export const PricePointSchema = z.object({
    date: z.string(), // ISO Date or "Jan 24" format
    price: z.number().positive(),
    volume: z.number().int().nonnegative().optional(),
});

export const PriceTrendSchema = z.array(PricePointSchema);
export type PricePoint = z.infer<typeof PricePointSchema>;

// Dashboard Schemas (Ref: Final Page)
export const UtilizationMetricSchema = z.object({
    year: z.string(),
    hours: z.number(),
});
export type UtilizationMetric = z.infer<typeof UtilizationMetricSchema>;

export const MonthlyUtilizationSchema = z.object({
    month: z.string(),
    hours: z.number(),
});
export type MonthlyUtilization = z.infer<typeof MonthlyUtilizationSchema>;

export const FleetAgeMetricSchema = z.object({
    age: z.string(),
    count: z.number(),
    color: z.string(),
});
export type FleetAgeMetric = z.infer<typeof FleetAgeMetricSchema>;

export const CharterMetricSchema = z.object({
    name: z.string(),
    value: z.number(),
    color: z.string(),
});
export type CharterMetric = z.infer<typeof CharterMetricSchema>;

export const OperatorMetricSchema = z.object({
    name: z.string(),
    share: z.number(),
});
export type OperatorMetric = z.infer<typeof OperatorMetricSchema>;

// Aircraft Listing Schema (F9)
export const AircraftListingSchema = z.object({
    id: z.string(),
    serialNumber: z.string(),
    year: z.number(),
    model: z.string(),
    price: z.number(),
    hours: z.number(),
    location: z.string(),
    status: z.enum(['active', 'pending', 'sold', 'withdrawn']),
    daysOnMarket: z.number(),
});

export type AircraftListing = z.infer<typeof AircraftListingSchema>;
