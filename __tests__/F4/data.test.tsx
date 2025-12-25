import '@testing-library/jest-dom';
import { z } from 'zod';
import { PriceBucketSchema } from '@/lib/schemas';

describe('F4: Price Distribution - Data Logic', () => {
    it('F4.1.1 Validates bucket structure', () => {
        const validBucket = { range: '$10M-$12M', count: 5, min: 10000000, max: 12000000 };
        expect(PriceBucketSchema.safeParse(validBucket).success).toBe(true);
    });

    it('F4.1.2 Rejects negative counts', () => {
        const invalidBucket = { range: 'x', count: -1, min: 0, max: 0 };
        expect(PriceBucketSchema.safeParse(invalidBucket).success).toBe(false);
    });
});
