import { SupabaseDashboardRepository, type DashboardRepository } from '@/repositories/dashboard.repository';
import {
    type UtilizationMetric,
    type MonthlyUtilization,
    type FleetAgeMetric,
    type CharterMetric,
    type OperatorMetric,
    type AircraftListing,
    type MarketMetric
} from '@/lib/schemas';

const MODEL_ID = '550e8400-e29b-41d4-a716-446655440001'; // MVP: Hardcoded for now

export class DashboardService {
    constructor(private repo: DashboardRepository) {}

    async checkHealth(): Promise<boolean> {
        return this.repo.checkHealth();
    }

    async getUtilization(): Promise<UtilizationMetric[]> {
        return this.repo.getUtilization(MODEL_ID);
    }

    async getMonthlyUtilization(): Promise<MonthlyUtilization[]> {
        return this.repo.getMonthlyUtilization(MODEL_ID);
    }

    async getFleetAge(): Promise<FleetAgeMetric[]> {
        return this.repo.getFleetAge(MODEL_ID);
    }

    async getCharterMix(): Promise<CharterMetric[]> {
        return this.repo.getCharterMix(MODEL_ID);
    }

    async getOperatorConcentration(): Promise<OperatorMetric[]> {
        return this.repo.getOperatorConcentration(MODEL_ID);
    }

    async getMarketListings(): Promise<AircraftListing[]> {
        return this.repo.getMarketListings(MODEL_ID);
    }

    async getMarketMetrics(): Promise<MarketMetric | null> {
        return this.repo.getMarketMetrics(MODEL_ID);
    }
}

// Factory/Composition Root
const repo = new SupabaseDashboardRepository();
export const dashboardService = new DashboardService(repo);