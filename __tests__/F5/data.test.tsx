import '@testing-library/jest-dom';
import { z } from 'zod';
import { PriceTrendSchema } from '@/lib/schemas';

describe('F5: Price Trends - Data Logic', () => {
    it('F5.1.1 Validates trend point structure', () => {
        const validPoint = { date: 'Jan 24', price: 15000000, volume: 5 };
        expect(PriceTrendSchema.element.safeParse(validPoint).success).toBe(true);
    });

    it('F5.1.2 Rejects negative price', () => {
        const invalidPoint = { date: 'Jan 24', price: -500 };
        expect(PriceTrendSchema.element.safeParse(invalidPoint).success).toBe(false);
    });
});
