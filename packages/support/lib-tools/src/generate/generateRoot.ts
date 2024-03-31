import { CompilerContext } from '@noodles-ui/core-compiler';

import { generateGlobalScssFile } from './system/generateGlobalScssFile';
import { generateIndexFile } from './system/generateIndexFile';
import { generateRootComponent } from './system/generateRootComponent';
import { generateRootCssTokens } from './system/generateRootCssTokens';
import { generateRootScssModule } from './system/generateRootScssModule';

export const generateRoot = async (compiler: CompilerContext, targetDir: string): Promise<void> => {
    const tasks = [
        generateIndexFile(compiler, targetDir),
        generateGlobalScssFile(compiler, targetDir),
        generateRootComponent(compiler, targetDir),
        generateRootCssTokens(compiler, targetDir),
        generateRootScssModule(compiler, targetDir),
    ];

    await Promise.all(tasks);
};
