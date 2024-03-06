import { join, parse } from 'path';

export const removeExtension = (fileName: string): string => {
    const parts = parse(fileName);
    return join(parts.dir, parts.name);
};
