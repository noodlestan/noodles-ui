export const formatSeconds = (ms: number, decimals: number = 1): string =>
    (Math.round(ms) / 1000).toFixed(decimals) + 's';
