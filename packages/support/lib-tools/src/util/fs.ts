import { mkdir } from 'fs/promises';
import { dirname, join, parse } from 'path';

export const ensuredFiledir = async (fileName: string): Promise<void> => {
    const dir = dirname(fileName);
    await mkdir(dir, { recursive: true });
};
export const removeExtension = (fileName: string): string => {
    const parts = parse(fileName);
    return join(parts.dir, parts.name);
};
