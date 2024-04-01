export const camelCase = (str: string): string =>
    str.replace(/-([a-z])/gi, match => match[1].toUpperCase());
