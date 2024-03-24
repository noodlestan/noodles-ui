export const camelCase = (str: string): string =>
    str.replace(/-([a-z])/gi, match => match[1].toUpperCase());

export const formatMilieconds = (ms: number): string => (Math.round(ms) / 1000).toFixed(1) + 's';

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const plural = (num: number, text: string): string => (num === 1 ? text : text + 's');
