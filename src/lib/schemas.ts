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
    modelId: z.string().uuid().optional(),
    date: z.string(), // ISO date
    askingPriceVsMarket: z.number(),
    residualValueStrength: z.number().min(0).max(100).optional().default(85),
    marketActivityScore: z.number().min(0).max(100).optional().default(70),
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

export const GeographicDistributionSchema = z.object({
    region: z.string(),
    percentage: z.number(),
    count: z.number().optional(),
});
export type GeographicDistribution = z.infer<typeof GeographicDistributionSchema>;

// Feature 11: Executive Snapshot
export const ExecutiveSnapshotSchema = z.object({
    medianAnnualUtilization: z.object({
        value: z.number(),
        trend: z.string(),
        trendDirection: z.enum(['up', 'down', 'stable']),
    }),
    utilizationDispersion: z.object({
        value: z.string(),
        trend: z.string(),
        trendDirection: z.enum(['up', 'down', 'stable']),
    }),
    charterPenetration: z.object({
        value: z.string(),
        trend: z.string(),
        trendDirection: z.enum(['up', 'down', 'stable']),
    }),
    medianFleetAge: z.object({
        value: z.number(),
    }),
    utilizationTrendYoY: z.object({
        value: z.number(),
        trend: z.string(),
        trendDirection: z.enum(['up', 'down', 'stable']),
    }),
    geographicConcentration: z.object({
        value: z.number(),
        trend: z.string(),
        trendDirection: z.enum(['up', 'down', 'stable']),
    }),
    takeaways: z.string(),
});

export type ExecutiveSnapshot = z.infer<typeof ExecutiveSnapshotSchema>;

// Feature 12: Utilization Behavior
export const UtilizationBehaviorSchema = z.object({
    stabilityIndex: z.number(),
    volatility: z.enum(['Low Volatility', 'Medium Volatility', 'High Volatility']),
    takeaways: z.array(z.string()),
    annualDistribution: z.array(z.object({ Range: z.string(), Percentage: z.number() })),
    medianTrend: z.array(z.object({ Month: z.string(), Hours: z.number() })),
});

export type UtilizationBehaviorData = z.infer<typeof UtilizationBehaviorSchema>;

// Feature 13: Fleet Structure & Aging
export const FleetStructureAgingSchema = z.object({
    distribution: z.array(z.object({ Range: z.string(), Percentage: z.number() })),
    insights: z.array(z.object({
        type: z.enum(['risk', 'alignment']),
        title: z.string(),
        text: z.string(),
    })),
});

export type FleetStructureAgingData = z.infer<typeof FleetStructureAgingSchema>;

// Feature 14: Charter Exposure & Commercialization
export const CharterExposureSchema = z.object({
    segments: z.array(z.object({
        name: z.string(),
        value: z.number(),
        percentage: z.number(),
        color: z.string(),
    })),
    riskAnalysis: z.array(z.object({
        title: z.string(),
        description: z.string(),
    })),
});

export type CharterExposureData = z.infer<typeof CharterExposureSchema>;



