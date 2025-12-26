-- Seed Data for Aircraft Analytics Platform
-- Includes: Bombardier Challenger 350, Cessna Citation Latitude, Embraer Praetor 600, Gulfstream G280

-- 1. AIRCRAFT MODELS
-- IDs are hardcoded to match the frontend mock data to ensure images load correctly.

-- Bombardier Challenger 350
INSERT INTO aircraft_models (id, name, manufacturer, category, manufactured_start, image_url, specs)
VALUES (
    '550e8400-e29b-41d4-a716-446655440001', 
    'Bombardier Challenger 350', 
    'Bombardier',
    'Super-Midsize', 
    2014,
    '/images/challenger-ext.jpg',
    '{"range": "3,200 nm", "speed": "0.83 M", "seats": 10}'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Cessna Citation Latitude
INSERT INTO aircraft_models (id, name, manufacturer, category, manufactured_start, image_url, specs)
VALUES (
    '550e8400-e29b-41d4-a716-446655440002', 
    'Cessna Citation Latitude', 
    'Textron Aviation',
    'Midsize', 
    2015,
    '/images/latitude-ext.jpg',
    '{"range": "2,700 nm", "speed": "0.80 M", "seats": 9}'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Embraer Praetor 600
INSERT INTO aircraft_models (id, name, manufacturer, category, manufactured_start, image_url, specs)
VALUES (
    '550e8400-e29b-41d4-a716-446655440003', 
    'Embraer Praetor 600', 
    'Embraer',
    'Super-Midsize', 
    2019,
    '/images/praetor-ext.jpg',
    '{"range": "4,018 nm", "speed": "0.83 M", "seats": 12}'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Gulfstream G280
INSERT INTO aircraft_models (id, name, manufacturer, category, manufactured_start, image_url, specs)
VALUES (
    '550e8400-e29b-41d4-a716-446655440004', 
    'Gulfstream G280', 
    'Gulfstream',
    'Super-Midsize', 
    2012,
    '/images/g280-ext.jpg',
    '{"range": "3,600 nm", "speed": "0.85 M", "seats": 10}'::JSONB
) ON CONFLICT (id) DO NOTHING;


-- 2. AGGREGATED METRICS (Utilization & Price)

-- Challenger 350 Data
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'utilization_annual', '2019-01-01', 420),
('550e8400-e29b-41d4-a716-446655440001', 'utilization_annual', '2020-01-01', 280),
('550e8400-e29b-41d4-a716-446655440001', 'utilization_annual', '2021-01-01', 380),
('550e8400-e29b-41d4-a716-446655440001', 'utilization_annual', '2022-01-01', 450),
('550e8400-e29b-41d4-a716-446655440001', 'utilization_annual', '2023-01-01', 410);

-- Citation Latitude Data (High utilization due to NetJets)
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'utilization_annual', '2019-01-01', 580),
('550e8400-e29b-41d4-a716-446655440002', 'utilization_annual', '2020-01-01', 450),
('550e8400-e29b-41d4-a716-446655440002', 'utilization_annual', '2021-01-01', 620),
('550e8400-e29b-41d4-a716-446655440002', 'utilization_annual', '2022-01-01', 710),
('550e8400-e29b-41d4-a716-446655440002', 'utilization_annual', '2023-01-01', 690);

-- Praetor 600 Data (Ramping up)
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'utilization_annual', '2020-01-01', 250),
('550e8400-e29b-41d4-a716-446655440003', 'utilization_annual', '2021-01-01', 320),
('550e8400-e29b-41d4-a716-446655440003', 'utilization_annual', '2022-01-01', 390),
('550e8400-e29b-41d4-a716-446655440003', 'utilization_annual', '2023-01-01', 415);

-- G280 Data (Steady)
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'utilization_annual', '2019-01-01', 360),
('550e8400-e29b-41d4-a716-446655440004', 'utilization_annual', '2020-01-01', 290),
('550e8400-e29b-41d4-a716-446655440004', 'utilization_annual', '2021-01-01', 340),
('550e8400-e29b-41d4-a716-446655440004', 'utilization_annual', '2022-01-01', 375),
('550e8400-e29b-41d4-a716-446655440004', 'utilization_annual', '2023-01-01', 355);


-- 3. DISTRIBUTIONS

-- Challenger 350 Distributions
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '0-5 Years', 35, NULL, 1),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '6-10 Years', 45, NULL, 2),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '10+ Years', 20, NULL, 3),
('550e8400-e29b-41d4-a716-446655440001', 'charter_mix', 'Corporate', 60, NULL, 1),
('550e8400-e29b-41d4-a716-446655440001', 'charter_mix', 'Charter', 40, NULL, 2),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', '25%', 15, NULL, 3),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', '10%', 20, NULL, 2),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', '5%', 65, NULL, 1);

-- Citation Latitude Distributions (NetJets Heavy)
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'fleet_age', '0-5 Years', 55, NULL, 1),
('550e8400-e29b-41d4-a716-446655440002', 'fleet_age', '6-10 Years', 45, NULL, 2),
('550e8400-e29b-41d4-a716-446655440002', 'charter_mix', 'Fractional/Charter', 70, NULL, 1),
('550e8400-e29b-41d4-a716-446655440002', 'charter_mix', 'Corporate', 30, NULL, 2),
('550e8400-e29b-41d4-a716-446655440002', 'operator_concentration', '55%', 55, NULL, 1),
('550e8400-e29b-41d4-a716-446655440002', 'operator_concentration', '45%', 45, NULL, 2);

-- Praetor 600 Distributions (Young Fleet)
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'fleet_age', '0-2 Years', 40, NULL, 1),
('550e8400-e29b-41d4-a716-446655440003', 'fleet_age', '3-5 Years', 60, NULL, 2),
('550e8400-e29b-41d4-a716-446655440003', 'charter_mix', 'Fractional', 45, NULL, 1),
('550e8400-e29b-41d4-a716-446655440003', 'charter_mix', 'Corporate', 55, NULL, 2),
('550e8400-e29b-41d4-a716-446655440003', 'operator_concentration', '40%', 40, NULL, 1),
('550e8400-e29b-41d4-a716-446655440003', 'operator_concentration', '10%', 10, NULL, 2),
('550e8400-e29b-41d4-a716-446655440003', 'operator_concentration', '50%', 50, NULL, 3);

-- G280 Distributions
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'fleet_age', '0-5 Years', 30, NULL, 1),
('550e8400-e29b-41d4-a716-446655440004', 'fleet_age', '6-10 Years', 40, NULL, 2),
('550e8400-e29b-41d4-a716-446655440004', 'fleet_age', '10+ Years', 30, NULL, 3),
('550e8400-e29b-41d4-a716-446655440004', 'charter_mix', 'Corporate', 65, NULL, 1),
('550e8400-e29b-41d4-a716-446655440004', 'charter_mix', 'Charter', 35, NULL, 2),
('550e8400-e29b-41d4-a716-446655440004', 'operator_concentration', '10%', 10, NULL, 1),
('550e8400-e29b-41d4-a716-446655440004', 'operator_concentration', '90%', 90, NULL, 2);


-- 4. SIGNAL STATES
-- Just inserting some sample data for all
INSERT INTO signal_states (model_id, signal_type, status, confidence_score, description) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'residual_risk', 'Positive', 92, 'High demand sustains values'),
('550e8400-e29b-41d4-a716-446655440002', 'liquidity', 'High', 95, 'Very active secondary market'),
('550e8400-e29b-41d4-a716-446655440003', 'residual_risk', 'Stable', 88, 'New type establishing curve'),
('550e8400-e29b-41d4-a716-446655440004', 'competition', 'Watch', 82, 'Pressure from Challenger 3500');
