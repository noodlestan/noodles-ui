import { CompilerContext } from '@noodles-ui/core-compiler';
import { ThemeBuildContext } from '@noodles-ui/core-entities';

import { generateThemeConstant } from './Theme/generateThemeConstant';
import { generateThemeScssVars } from './Theme/generateThemeScssVars';
import { generateThemeTypescriptTokens } from './Theme/generateThemeTypescriptTokens';

export const generateThemeComponent = async (
    compiler: CompilerContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const tasks = [
        generateThemeConstant(compiler, targetDir, theme),
        generateThemeTypescriptTokens(compiler, targetDir, theme),
        generateThemeScssVars(compiler, targetDir, theme),
    ];

    await Promise.all(tasks);
};
