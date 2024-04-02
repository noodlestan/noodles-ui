import { rm } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';

import { generateComponents } from './generateComponents';
import { generateRoot } from './generateRoot';
import { generateSurfaces } from './generateSurfaces';
import { generateThemes } from './generateThemes';
import { generateVariants } from './generateVariants';

export const generateAll = async (compiler: CompilerContext, targetDir: string): Promise<void> => {
    await rm(targetDir, { recursive: true, force: true });
    const tasks = [
        await generateRoot(compiler, targetDir),
        await generateSurfaces(compiler, targetDir),
        await generateThemes(compiler, targetDir),
        await generateComponents(compiler, targetDir),
        await generateVariants(compiler, targetDir),
    ];

    await Promise.all(tasks);
};
