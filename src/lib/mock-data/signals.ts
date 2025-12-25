// Market signal states
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

// Challenger 350 signals (from seed.sql)
export const signals: Signal[] = [
    // Buyer perspective - Short term
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'price_momentum', signalLabel: 'Price Momentum', signalValue: 'neutral', confidence: 65, perspective: 'buyer', timeframe: 'short' },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'inventory_level', signalLabel: 'Inventory Level', signalValue: 'bullish', confidence: 72, perspective: 'buyer', timeframe: 'short' },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'negotiation_power', signalLabel: 'Negotiation Power', signalValue: 'bullish', confidence: 68, perspective: 'buyer', timeframe: 'short' },
    // Buyer perspective - Long term
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'value_retention', signalLabel: 'Value Retention', signalValue: 'neutral', confidence: 62, perspective: 'buyer', timeframe: 'long' },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'market_outlook', signalLabel: 'Market Outlook', signalValue: 'bullish', confidence: 70, perspective: 'buyer', timeframe: 'long' },
    // Seller perspective - Short term
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'demand_strength', signalLabel: 'Demand Strength', signalValue: 'bullish', confidence: 75, perspective: 'seller', timeframe: 'short' },
    { id: '7', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'time_to_sell', signalLabel: 'Time to Sell', signalValue: 'neutral', confidence: 58, perspective: 'seller', timeframe: 'short' },
    { id: '8', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'price_achievability', signalLabel: 'Price Achievability', signalValue: 'neutral', confidence: 64, perspective: 'seller', timeframe: 'short' },
    // Seller perspective - Long term
    { id: '9', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'depreciation_trend', signalLabel: 'Depreciation Trend', signalValue: 'bearish', confidence: 72, perspective: 'seller', timeframe: 'long' },
    { id: '10', modelId: '550e8400-e29b-41d4-a716-446655440001', signalName: 'replacement_cycle', signalLabel: 'Replacement Cycle', signalValue: 'neutral', confidence: 55, perspective: 'seller', timeframe: 'long' },
];

export const getSignalsByModelId = (modelId: string): Signal[] =>
    signals.filter(s => s.modelId === modelId);

export const getSignalsByFilter = (
    modelId: string,
    perspective?: Perspective,
    timeframe?: Timeframe
): Signal[] => {
    return signals.filter(s => {
        if (s.modelId !== modelId) return false;
        if (perspective && s.perspective !== perspective) return false;
        if (timeframe && s.timeframe !== timeframe) return false;
        return true;
    });
};
