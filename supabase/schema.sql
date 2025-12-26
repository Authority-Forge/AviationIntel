-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. AIRCRAFT MODELS
-- Core reference table for aircraft types (e.g., "Bombardier Challenger 350")
CREATE TABLE aircraft_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Light', 'Midsize', 'Super-Midsize', 'Heavy', 'Ultra-Long')),
    manufactured_start INTEGER,
    manufactured_end INTEGER, -- NULL means 'Present'
    image_url TEXT,
    specs JSONB DEFAULT '{}'::JSONB, -- Range, Speed, Seats, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE aircraft_models ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access" ON aircraft_models FOR SELECT USING (true);


-- 2. AGGREGATED METRICS (Time-Series)
-- Stores annual/monthly data points for line/bar charts (Utilization, Price Trends)
CREATE TABLE aggregated_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID REFERENCES aircraft_models(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL CHECK (metric_type IN ('utilization_annual', 'utilization_monthly', 'price_trend')),
    period_date DATE NOT NULL, -- First day of year or month
    value NUMERIC NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB, -- e.g., { "volume": 12 } for price trends
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE aggregated_metrics ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access" ON aggregated_metrics FOR SELECT USING (true);


-- 3. DISTRIBUTIONS (Snapshot Data)
-- Stores categorical data for pie/bar charts (Fleet Age, Charter Mix, Operator Concentration)
CREATE TABLE distributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID REFERENCES aircraft_models(id) ON DELETE CASCADE,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('fleet_age', 'charter_mix', 'operator_concentration', 'market_geography')),
    bucket_label TEXT NOT NULL, -- e.g., "0-2 Years", "NetJets", "North America"
    value NUMERIC NOT NULL, -- Count or Percentage
    color_hex TEXT, -- Optional override, UI usually handles this
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE distributions ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access" ON distributions FOR SELECT USING (true);


-- 4. SIGNAL STATES (Risk & Insights)
-- Stores calculated market signals (e.g., "Low Residual Risk", "Stable Liquidity")
CREATE TABLE signal_states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID REFERENCES aircraft_models(id) ON DELETE CASCADE,
    signal_type TEXT NOT NULL CHECK (signal_type IN ('residual_risk', 'liquidity', 'age_concentration', 'competition', 'manufacturer_support')),
    status TEXT NOT NULL CHECK (status IN ('Positive', 'Stable', 'Watch', 'Negative', 'Low', 'Moderate', 'High')),
    confidence_score INTEGER CHECK (confidence_score BETWEEN 0 AND 100),
    description TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE signal_states ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access" ON signal_states FOR SELECT USING (true);


-- INDICES for Performance
CREATE INDEX idx_metrics_model_date ON aggregated_metrics(model_id, period_date);
CREATE INDEX idx_distributions_model_type ON distributions(model_id, analysis_type);
CREATE INDEX idx_signals_model ON signal_states(model_id);
