import { mkdir } from 'fs/promises';
import { dirname } from 'path';

export const ensuredFiledir = async (fileName: string): Promise<void> => {
    const dir = dirname(fileName);
    await mkdir(dir, { recursive: true });
};
