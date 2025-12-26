import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/solid';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number; // percent change
    trend?: 'up' | 'down' | 'stable';
    format?: 'currency' | 'number' | 'percent';
    inverse?: boolean;
}

export default function MetricCard({ title, value, change, trend, format = 'number', inverse = false }: MetricCardProps) {
    // Handle Null/Undefined/NaN
    if (value === null || value === undefined) {
        return (
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">-</dd>
            </div>
        );
    }

    const displayValue = format === 'currency' && typeof value === 'number'
        ? formatCurrency(value)
        : (typeof value === 'number' ? value.toLocaleString('en-US') : value);

    // Handle valid change presence (0 is valid, NaN/Infinity is not)
    const hasChange = change !== undefined && !Number.isNaN(change) && Number.isFinite(change);

    // Color logic
    const isUp = trend === 'up';
    const isDown = trend === 'down';
    const isPositiveChange = (isUp && !inverse) || (isDown && inverse);
    const isNegativeChange = (isDown && !inverse) || (isUp && inverse);

    let badgeColor = 'bg-gray-100 text-gray-800';
    let iconColor = 'text-gray-500';
    let textColor = 'text-gray-600';

    if (isPositiveChange) {
        badgeColor = 'bg-green-100 text-green-800';
        iconColor = 'text-green-500';
        textColor = 'text-green-600';
    } else if (isNegativeChange) {
        badgeColor = 'bg-red-100 text-red-800';
        iconColor = 'text-red-500';
        textColor = 'text-red-600';
    }

    return (
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6" data-testid="metric-card">
            <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                    {displayValue}
                </div>

                {hasChange && (
                    <div className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 ${badgeColor}`}>
                        {isUp && <ArrowUpIcon data-testid="trend-icon" className={`-ml-1 mr-0.5 h-4 w-4 shrink-0 self-center ${iconColor}`} aria-hidden="true" />}
                        {isDown && <ArrowDownIcon data-testid="trend-icon" className={`-ml-1 mr-0.5 h-4 w-4 shrink-0 self-center ${iconColor}`} aria-hidden="true" />}
                        {(!isUp && !isDown) && <MinusIcon data-testid="trend-icon" className={`-ml-1 mr-0.5 h-4 w-4 shrink-0 self-center ${iconColor}`} aria-hidden="true" />}

                        <span className="sr-only">
                            {trend === 'up' ? 'Increased by' : trend === 'down' ? 'Decreased by' : 'Changed by'}
                        </span>
                        <span className={textColor}>
                            {formatPercent(change!)}
                        </span>
                    </div>
                )}
            </dd>
        </div>
    );
}
