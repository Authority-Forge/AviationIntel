-- =====================================================
-- Aviation Intelligence Platform - Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- AIRCRAFT MODELS
-- Primary reference table for all aircraft models
-- =====================================================
CREATE TABLE aircraft_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_aircraft_models_manufacturer ON aircraft_models(manufacturer);
CREATE INDEX idx_aircraft_models_category ON aircraft_models(category);

-- =====================================================
-- MARKET METRICS
-- Time-series market position data
-- =====================================================
CREATE TABLE market_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  asking_price_vs_market NUMERIC(5,2),
  residual_value_strength NUMERIC(5,2),
  market_activity_score NUMERIC(5,2),
  avg_asking_price NUMERIC(15,2),
  avg_days_on_market INTEGER,
  active_listings INTEGER,
  trend_direction TEXT CHECK (trend_direction IN ('up', 'down', 'stable')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_market_metrics_model_date ON market_metrics(model_id, date DESC);

-- =====================================================
-- PRICE DISTRIBUTIONS
-- Pre-computed histogram buckets for price charts
-- =====================================================
CREATE TABLE price_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  bucket_min NUMERIC(15,2) NOT NULL,
  bucket_max NUMERIC(15,2) NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_price_distributions_model ON price_distributions(model_id);

-- =====================================================
-- PRICE TRENDS
-- Historical price trend data with event markers
-- =====================================================
CREATE TABLE price_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  avg_price NUMERIC(15,2) NOT NULL,
  min_price NUMERIC(15,2),
  max_price NUMERIC(15,2),
  sample_size INTEGER,
  event_marker TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_price_trends_model_date ON price_trends(model_id, date DESC);

-- =====================================================
-- DAYS ON MARKET DISTRIBUTION
-- Pre-computed DOM histogram
-- =====================================================
CREATE TABLE days_on_market_distribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  bucket_label TEXT NOT NULL,
  bucket_order INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dom_distribution_model ON days_on_market_distribution(model_id);

-- =====================================================
-- COMPARATIVE METRICS
-- Cross-model benchmark data
-- =====================================================
CREATE TABLE comparative_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  compare_model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  subject_value NUMERIC(15,2) NOT NULL,
  compare_value NUMERIC(15,2) NOT NULL,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comparative_metrics_model ON comparative_metrics(model_id);

-- =====================================================
-- SIGNAL STATES
-- Market signal snapshots with timestamps
-- =====================================================
CREATE TABLE signal_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  signal_name TEXT NOT NULL,
  signal_label TEXT NOT NULL,
  signal_value TEXT NOT NULL CHECK (signal_value IN ('bullish', 'bearish', 'neutral')),
  confidence NUMERIC(5,2) CHECK (confidence >= 0 AND confidence <= 100),
  perspective TEXT NOT NULL CHECK (perspective IN ('buyer', 'seller')),
  timeframe TEXT NOT NULL CHECK (timeframe IN ('short', 'long')),
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_to TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_signal_states_model ON signal_states(model_id);
CREATE INDEX idx_signal_states_active ON signal_states(model_id) WHERE valid_to IS NULL;

-- =====================================================
-- AIRCRAFT LISTINGS
-- Individual aircraft for the data table
-- =====================================================
CREATE TABLE aircraft_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES aircraft_models(id) ON DELETE CASCADE,
  serial_number TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_hours INTEGER,
  total_cycles INTEGER,
  asking_price NUMERIC(15,2),
  days_on_market INTEGER,
  location TEXT,
  status TEXT CHECK (status IN ('active', 'sold', 'pending', 'withdrawn')),
  listed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_aircraft_listings_model ON aircraft_listings(model_id);
CREATE INDEX idx_aircraft_listings_status ON aircraft_listings(status);
CREATE INDEX idx_aircraft_listings_year ON aircraft_listings(year DESC);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE aircraft_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE days_on_market_distribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparative_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE signal_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE aircraft_listings ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all data
CREATE POLICY "Authenticated users can read aircraft_models" ON aircraft_models
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read market_metrics" ON market_metrics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read price_distributions" ON price_distributions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read price_trends" ON price_trends
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read days_on_market_distribution" ON days_on_market_distribution
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read comparative_metrics" ON comparative_metrics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read signal_states" ON signal_states
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read aircraft_listings" ON aircraft_listings
  FOR SELECT TO authenticated USING (true);
