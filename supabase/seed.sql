-- Seed Data for Bombardier Challenger 350

-- 1. Insert Aircraft Model
WITH new_model AS (
    INSERT INTO aircraft_models (id, name, category, manufactured_start, specs)
    VALUES (
        '550e8400-e29b-41d4-a716-446655440001', 
        'Bombardier Challenger 350', 
        'Super-Midsize', 
        2014,
        '{"range": "3,200 nm", "speed": "0.83 M", "seats": 9}'::JSONB
    )
    RETURNING id
)

-- 2. Insert Aggregated Metrics (Utilization)
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value)
SELECT id, 'utilization_annual', '2019-01-01', 420 FROM new_model UNION ALL
SELECT id, 'utilization_annual', '2020-01-01', 280 FROM new_model UNION ALL
SELECT id, 'utilization_annual', '2021-01-01', 380 FROM new_model UNION ALL
SELECT id, 'utilization_annual', '2022-01-01', 450 FROM new_model UNION ALL
SELECT id, 'utilization_annual', '2023-01-01', 410 FROM new_model UNION ALL
SELECT id, 'utilization_annual', '2024-01-01', 390 FROM new_model;

-- Monthly Utilization (2024)
INSERT INTO aggregated_metrics (model_id, metric_type, period_date, value)
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-01-01', 32 UNION ALL
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-02-01', 35 UNION ALL
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-03-01', 38 UNION ALL
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-04-01', 36 UNION ALL
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-05-01', 34 UNION ALL
SELECT '550e8400-e29b-41d4-a716-446655440001', 'utilization_monthly', '2024-06-01', 33;

-- 3. Distributions
-- Fleet Age
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex, sort_order)
VALUES
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '0-2', 45, '#93C5FD', 1),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '3-5', 68, '#60A5FA', 2),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '6-10', 142, '#3B82F6', 3),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '11-15', 98, '#2563EB', 4),
('550e8400-e29b-41d4-a716-446655440001', 'fleet_age', '16+', 67, '#EF4444', 5);

-- Charter Mix
INSERT INTO distributions (model_id, analysis_type, bucket_label, value, color_hex)
VALUES
('550e8400-e29b-41d4-a716-446655440001', 'charter_mix', 'Private/Corporate', 68, '#3B82F6'),
('550e8400-e29b-41d4-a716-446655440001', 'charter_mix', 'Charter/Commercial', 32, '#EF4444');

-- Operator Concentration
INSERT INTO distributions (model_id, analysis_type, bucket_label, value)
VALUES
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', 'NetJets', 12.5),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', 'VistaJet', 8.3),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', 'Flexjet', 6.7),
('550e8400-e29b-41d4-a716-446655440001', 'operator_concentration', 'Others', 72.5);

-- 4. Signal States
INSERT INTO signal_states (model_id, signal_type, status, confidence_score, description)
VALUES
('550e8400-e29b-41d4-a716-446655440001', 'residual_risk', 'Low', 95, 'Strong value retention expected'),
('550e8400-e29b-41d4-a716-446655440001', 'liquidity', 'Stable', 90, 'Consistent transaction volume'),
('550e8400-e29b-41d4-a716-446655440001', 'age_concentration', 'Moderate', 85, '16% fleet reaching 16+ years'),
('550e8400-e29b-41d4-a716-446655440001', 'competition', 'Watch', 80, 'Praetor 600 market entry'),
('550e8400-e29b-41d4-a716-446655440001', 'manufacturer_support', 'Positive', 95, 'Strong OEM support network');

-- 5. Listings (Mock Data)
INSERT INTO listings (id, model_id, serial_number, year, price, hours, location, status, days_on_market)
VALUES
('11111111-1111-1111-1111-111111111101', '550e8400-e29b-41d4-a716-446655440001', '20638', 2017, 18500000, 1450, 'USA (NC)', 'active', 45),
('11111111-1111-1111-1111-111111111102', '550e8400-e29b-41d4-a716-446655440001', '20712', 2018, 19200000, 1100, 'USA (TX)', 'active', 12),
('11111111-1111-1111-1111-111111111103', '550e8400-e29b-41d4-a716-446655440001', '20555', 2015, 16800000, 2200, 'UK', 'pending', 120),
('11111111-1111-1111-1111-111111111104', '550e8400-e29b-41d4-a716-446655440001', '20801', 2019, 21500000, 850, 'USA (FL)', 'active', 5),
('11111111-1111-1111-1111-111111111105', '550e8400-e29b-41d4-a716-446655440001', '20444', 2014, 15900000, 3100, 'Germany', 'sold', 180),
('11111111-1111-1111-1111-111111111106', '550e8400-e29b-41d4-a716-446655440001', '20902', 2021, 23500000, 450, 'USA (CA)', 'active', 3),
('11111111-1111-1111-1111-111111111107', '550e8400-e29b-41d4-a716-446655440001', '20610', 2016, 17200000, 1900, 'UAE', 'active', 95),
('11111111-1111-1111-1111-111111111108', '550e8400-e29b-41d4-a716-446655440001', '20755', 2018, 19800000, 980, 'USA (NY)', 'active', 22);
