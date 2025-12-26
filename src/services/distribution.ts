import { createBrowserClient } from '@supabase/ssr';
import { PriceDistributionSchema, type PriceBucket } from '@/lib/schemas';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const distributionService = {
    /**
     * Fetches price distribution for a specific model
     */
    async getPriceDistribution(modelId: string): Promise<PriceBucket[]> {
        const { data, error } = await supabase
            .from('distributions')
            .select('bucket_label, value')
            .eq('model_id', modelId)
            .eq('analysis_type', 'price_distribution')
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching price distribution:', error);
            throw error;
        }

        // Map database fields to schema with parsing for min/max
        const mappedData = data.map(item => {
            const label = item.bucket_label;
            let min = 0;
            let max = 0;

            const rangeMatch = label.match(/\$(\d+)M-\$(\d+)M/);
            if (rangeMatch) {
                min = parseInt(rangeMatch[1]);
                max = parseInt(rangeMatch[2]);
            } else if (label.includes('+')) {
                min = parseInt(label.replace(/\D/g, ''));
                max = min + 5; // Arbitrary cap for the '+' bucket
            }

            return {
                range: label,
                count: Number(item.value),
                min,
                max
            };
        });

        const result = PriceDistributionSchema.safeParse(mappedData);
        if (!result.success) {
            console.error('Price Distribution Validation Error:', result.error);
            throw new Error('Data validation failed');
        }

        return result.data;
    }
};
