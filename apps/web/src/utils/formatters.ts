/**
 * Formats a number as Norwegian krone with optional monthly suffix.
 */
export const formatNOK = (cents: number, withSuffix = false): string => {
    const amount = cents / 100;
    const formatted = new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    // Standardize suffix to "kr / mnd" instead of just replacing kr
    if (withSuffix) {
        return `${formatted.replace(/\s?kr/, "")} kr / mnd`.trim();
    }
    return formatted;
};

/**
 * Formats a number with space as thousands separator.
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("nb-NO").format(value);
};

/**
 * Formats kilometers for Norwegian locale.
 * Example: 15000 -> "15 000 km / år"
 */
export const formatKM = (km: number): string => {
    return `${formatNumber(km)} km / år`;
};

/**
 * Formats a date for Norwegian locale.
 */
export const formatDate = (date: Date | string | null): string => {
    if (!date) return "-";
    const d = new Date(date);
    return new Intl.DateTimeFormat("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(d);
};

/**
 * Maps campaign types to their Norwegian labels.
 */
export const formatCampaignType = (type: string): string => {
    const mapping: Record<string, string> = {
        private: "Privat",
        business: "Næring",
    };
    return mapping[type.toLowerCase()] || type;
};
