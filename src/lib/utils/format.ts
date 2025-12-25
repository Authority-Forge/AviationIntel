export const formatCurrency = (value: number): string => {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000000000) {
        return `${sign}$${(absValue / 1000000000000).toFixed(1)}T`;
    }
    if (absValue >= 1000000) {
        return `${sign}$${(absValue / 1000000).toFixed(1)}M`;
    }
    if (absValue >= 1000) {
        return `${sign}$${(absValue / 1000).toFixed(0)}k`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export const formatPercent = (value: number): string => {
    return `${Math.abs(value).toFixed(1)}%`;
};
