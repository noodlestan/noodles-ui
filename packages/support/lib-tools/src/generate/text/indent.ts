const INDENT = '    ';

export const indent = (lines: string[]): string[] => lines.map(line => INDENT + line);
