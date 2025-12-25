// Centralized type definitions for Aviation Intelligence Platform

// Aircraft Models
export interface AircraftModel {
    id: string;
    name: string;
    manufacturer: string;
    category: string;
    imageUrl: string;
}

// Market Metrics
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

// Distributions
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

// Price Trends
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

// Signals
export type SignalValue = 'bullish' | 'bearish' | 'neutral';
export type Perspective = 'buyer' | 'seller';
export type Timeframe = 'short' | 'long';

export interface Signal {
    id: string;
    modelId: string;
    signalName: string;
    signalLabel: string;
    signalValue: SignalValue;
    confidence: number;
    perspective: Perspective;
    timeframe: Timeframe;
}

// Listings
export type ListingStatus = 'active' | 'sold' | 'pending' | 'withdrawn';

export interface AircraftListing {
    id: string;
    modelId: string;
    serialNumber: string;
    year: number;
    totalHours: number;
    totalCycles: number;
    askingPrice: number;
    daysOnMarket: number;
    location: string;
    status: ListingStatus;
    listedAt: string;
}

// API Response types (from ADD.md)
export interface APIResponse<T> {
    data: T;
    error?: string;
    meta?: {
        count: number;
        page: number;
    };
}

// Component Props types (from ADD.md)
export interface MetricCardProps {
    title: string;
    value: string | number;
    change: number;
    trend: TrendDirection;
    tooltip?: string;
}
