export const camelCase = (str: string): string =>
    str.replace(/-([a-z])/gi, match => match[1].toUpperCase());

export const formatMilieconds = (ms: number): string => (Math.round(ms) / 1000).toFixed(1) + 's';
