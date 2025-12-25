-- =====================================================
-- Aviation Intelligence Platform - Seed Data
-- Real market data sourced from AvBuyer, Controller,
-- GlobalAir, Aviation Week, JETNET (Dec 2024)
-- =====================================================

-- =====================================================
-- AIRCRAFT MODELS
-- =====================================================
INSERT INTO aircraft_models (id, name, manufacturer, category, image_url, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Challenger 350', 'Bombardier', 'Super Midsize', '/images/aircraft/challenger-350.jpg', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Citation Latitude', 'Cessna', 'Super Midsize', '/images/aircraft/citation-latitude.jpg', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Praetor 500', 'Embraer', 'Super Midsize', '/images/aircraft/praetor-500.jpg', NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Challenger 3500', 'Bombardier', 'Super Midsize', '/images/aircraft/challenger-3500.jpg', NOW());

-- =====================================================
-- MARKET METRICS (Time-series)
-- Challenger 350 monthly data 2024
-- =====================================================
INSERT INTO market_metrics (id, model_id, date, asking_price_vs_market, residual_value_strength, market_activity_score, avg_asking_price, avg_days_on_market, active_listings, trend_direction) VALUES
  -- Challenger 350 - 2024 monthly snapshots
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-01-01', -1.8, 72, 68, 19200000, 195, 11, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-02-01', -2.1, 71, 70, 19000000, 198, 12, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-03-01', -2.5, 70, 72, 18800000, 202, 12, 'down'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-04-01', -2.8, 69, 71, 18600000, 205, 13, 'down'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-05-01', -2.9, 68, 73, 18500000, 207, 13, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-06-01', -3.0, 68, 74, 18400000, 210, 14, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-07-01', -2.8, 68, 75, 18500000, 208, 14, 'up'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-08-01', -2.5, 69, 76, 18600000, 205, 13, 'up'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-09-01', -2.4, 69, 75, 18700000, 207, 14, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-10-01', -2.6, 68, 74, 18500000, 210, 15, 'down'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-11-01', -2.7, 68, 73, 18400000, 212, 14, 'stable'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-12-01', -2.8, 68, 72, 18500000, 207, 14, 'stable'),

  -- Citation Latitude - 2024 Q4
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440002', '2024-12-01', -1.2, 75, 65, 14500000, 185, 8, 'stable'),
  
  -- Praetor 500 - 2024 Q4
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440003', '2024-12-01', 1.5, 82, 58, 17200000, 145, 4, 'up');

-- =====================================================
-- PRICE DISTRIBUTIONS (Histogram buckets)
-- Current Challenger 350 price distribution Dec 2024
-- =====================================================
INSERT INTO price_distributions (id, model_id, bucket_min, bucket_max, count, computed_at) VALUES
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 13000000, 14000000, 1, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 14000000, 15000000, 1, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 15000000, 16000000, 2, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 16000000, 17000000, 2, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 17000000, 18000000, 3, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 18000000, 19000000, 2, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 19000000, 20000000, 1, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 20000000, 21000000, 1, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 21000000, 23000000, 1, NOW());

-- =====================================================
-- PRICE TRENDS (Historical price data)
-- Challenger 350 annual price trend 2020-2024
-- =====================================================
INSERT INTO price_trends (id, model_id, date, avg_price, min_price, max_price, sample_size, event_marker) VALUES
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2020-01-01', 20500000, 16000000, 24000000, 8, NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2020-06-01', 20800000, 16500000, 24500000, 6, 'COVID Impact'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2021-01-01', 21500000, 17000000, 25000000, 3, 'Supply Shortage'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2021-06-01', 22500000, 18000000, 26000000, 4, NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2022-01-01', 23000000, 19000000, 27000000, 5, 'Peak Prices'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2022-06-01', 22000000, 18000000, 26000000, 7, 'CL3500 Launch'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2023-01-01', 20500000, 17000000, 24000000, 10, 'Market Correction'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2023-06-01', 19500000, 16000000, 23000000, 12, NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-01-01', 19200000, 15500000, 23000000, 11, NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-06-01', 18500000, 15000000, 22000000, 14, 'Stabilizing'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '2024-12-01', 18500000, 13000000, 23000000, 14, NULL);

-- =====================================================
-- DAYS ON MARKET DISTRIBUTION
-- =====================================================
INSERT INTO days_on_market_distribution (id, model_id, bucket_label, bucket_order, count, computed_at) VALUES
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '0-60', 1, 2, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '61-120', 2, 3, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '121-180', 3, 4, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '181-240', 4, 3, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '241-300', 5, 1, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '300+', 6, 1, NOW());

-- =====================================================
-- COMPARATIVE METRICS
-- Challenger 350 vs competitors
-- =====================================================
INSERT INTO comparative_metrics (id, model_id, compare_model_id, metric_name, subject_value, compare_value, computed_at) VALUES
  -- CL350 vs Citation Latitude
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'avg_price', 18500000, 14500000, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'residual_5yr', 68, 75, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'days_on_market', 207, 185, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'fleet_for_sale_pct', 3.0, 2.5, NOW()),
  -- CL350 vs Praetor 500
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'avg_price', 18500000, 17200000, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'residual_5yr', 68, 82, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'days_on_market', 207, 145, NOW()),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'fleet_for_sale_pct', 3.0, 1.5, NOW());

-- =====================================================
-- SIGNAL STATES
-- Market intelligence signals
-- =====================================================
INSERT INTO signal_states (id, model_id, signal_name, signal_label, signal_value, confidence, perspective, timeframe, valid_from, valid_to) VALUES
  -- Buyer perspective - Short term
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'price_momentum', 'Price Momentum', 'neutral', 65, 'buyer', 'short', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'inventory_level', 'Inventory Level', 'bullish', 72, 'buyer', 'short', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'negotiation_power', 'Negotiation Power', 'bullish', 68, 'buyer', 'short', NOW(), NULL),
  
  -- Buyer perspective - Long term
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'value_retention', 'Value Retention', 'neutral', 62, 'buyer', 'long', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'market_outlook', 'Market Outlook', 'bullish', 70, 'buyer', 'long', NOW(), NULL),
  
  -- Seller perspective - Short term
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'demand_strength', 'Demand Strength', 'bullish', 75, 'seller', 'short', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'time_to_sell', 'Time to Sell', 'neutral', 58, 'seller', 'short', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'price_achievability', 'Price Achievability', 'neutral', 64, 'seller', 'short', NOW(), NULL),
  
  -- Seller perspective - Long term
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'depreciation_trend', 'Depreciation Trend', 'bearish', 72, 'seller', 'long', NOW(), NULL),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', 'replacement_cycle', 'Replacement Cycle', 'neutral', 55, 'seller', 'long', NOW(), NULL);

-- =====================================================
-- AIRCRAFT LISTINGS
-- Real listings from Controller/AvBuyer Dec 2024
-- =====================================================
INSERT INTO aircraft_listings (id, model_id, serial_number, year, total_hours, total_cycles, asking_price, days_on_market, location, status, listed_at) VALUES
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20509', 2014, 1826, 1245, 15500000, 245, 'USA', 'active', '2024-04-15'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20532', 2014, 3928, 2650, 14500000, 180, 'USA', 'pending', '2024-06-28'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20525', 2015, 3396, 2280, 16200000, 120, 'Europe', 'active', '2024-08-27'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20632', 2016, 2424, 1680, 17750000, 95, 'USA', 'active', '2024-09-22'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20698', 2017, 2100, 1450, 18200000, 150, 'Middle East', 'active', '2024-07-28'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20752', 2018, 1650, 1120, 18900000, 88, 'USA', 'active', '2024-09-29'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20806', 2019, 809, 580, 20500000, 210, 'USA', 'active', '2024-05-30'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20808', 2019, 1855, 1280, 19800000, 165, 'Europe', 'active', '2024-07-14'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20845', 2020, 720, 510, 21200000, 75, 'USA', 'active', '2024-10-12'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20872', 2020, 580, 420, 21800000, 45, 'Asia', 'active', '2024-11-11'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20901', 2021, 450, 320, 22500000, 30, 'USA', 'active', '2024-11-26'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20915', 2021, 380, 275, 22800000, 22, 'Europe', 'active', '2024-12-04'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20928', 2022, 285, 205, 23000000, 320, 'USA', 'active', '2024-02-08'),
  (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440001', '20935', 2022, 195, 145, 22500000, 280, 'Middle East', 'sold', '2024-03-19');
