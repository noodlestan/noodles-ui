import { mkdir } from 'fs/promises';
import { dirname, join, parse } from 'path';
import { relative } from 'path/posix';

export const ensuredFiledir = async (fileName: string): Promise<void> => {
    const dir = dirname(fileName);
    await mkdir(dir, { recursive: true });
};

export const removeExtension = (fileName: string): string => {
    const parts = parse(fileName);
    return join(parts.dir, parts.name);
};

export const relativePath = (fromFile: string, toFile: string, noExtenstion?: boolean): string => {
    const target = noExtenstion ? removeExtension(toFile) : toFile;
    const rel = relative(dirname(fromFile), target);
    return !rel.startsWith('.') ? `./${rel}` : rel;
};
