import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { join } from 'path';

import { logError } from '../cli/logger/logError';

type CopyOptions = {
    fileFilter?: (fileName: string) => boolean;
    processFile?: (fileName: string) => Promise<void>;
};
export const copyFiles = async (
    source: string,
    target: string,
    options: CopyOptions,
    root?: string,
): Promise<string[]> => {
    const { fileFilter, processFile } = options;
    const copies: string[] = [];
    try {
        await mkdir(target, { recursive: true });
        const files = await readdir(source);
        for (const file of files) {
            const sourceFile = join(source, file);
            if (!fileFilter || fileFilter(sourceFile)) {
                const fileStats = await stat(sourceFile);
                if (fileStats.isDirectory()) {
                    const targetFile = join(target, file);
                    const nestedCopies = await copyFiles(
                        sourceFile,
                        targetFile,
                        options,
                        root || target,
                    );
                    copies.push(...nestedCopies);
                } else {
                    const targetFile = join(target, file);
                    await copyFile(sourceFile, targetFile);
                    if (processFile) {
                        await processFile(targetFile);
                    }
                    copies.push(targetFile.replace(root || target, ''));
                }
            }
        }
    } catch (err) {
        logError('Error:', err as string);
    }

    return copies;
};
