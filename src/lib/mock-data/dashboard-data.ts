import { z } from 'zod';
import {
    UtilizationMetricSchema,
    MonthlyUtilizationSchema,
    FleetAgeMetricSchema,
    CharterMetricSchema,
    OperatorMetricSchema
} from '@/lib/schemas';

// Sample data from User Snippet
export const utilizationData = [
    { year: '2019', hours: 420 },
    { year: '2020', hours: 280 },
    { year: '2021', hours: 380 },
    { year: '2022', hours: 450 },
    { year: '2023', hours: 410 },
    { year: '2024', hours: 390 }
].map(d => UtilizationMetricSchema.parse(d));

export const fleetAgeData = [
    { age: '0-2', count: 45, color: '#93C5FD' },
    { age: '3-5', count: 68, color: '#60A5FA' },
    { age: '6-10', count: 142, color: '#3B82F6' },
    { age: '11-15', count: 98, color: '#2563EB' },
    { age: '16+', count: 67, color: '#EF4444' }
].map(d => FleetAgeMetricSchema.parse(d));

export const charterData = [
    { name: 'Private/Corporate', value: 68, color: '#3B82F6' },
    { name: 'Charter/Commercial', value: 32, color: '#EF4444' }
].map(d => CharterMetricSchema.parse(d));

export const operatorData = [
    { name: 'NetJets', share: 12.5 },
    { name: 'VistaJet', share: 8.3 },
    { name: 'Flexjet', share: 6.7 },
    { name: 'Others', share: 72.5 }
].map(d => OperatorMetricSchema.parse(d));

export const monthlyUtilization = [
    { month: 'Jan', hours: 32 },
    { month: 'Feb', hours: 35 },
    { month: 'Mar', hours: 38 },
    { month: 'Apr', hours: 36 },
    { month: 'May', hours: 34 },
    { month: 'Jun', hours: 33 }
].map(d => MonthlyUtilizationSchema.parse(d));
