import { CompilerContext, ThemeBuildContext } from '@noodles-ui/support-types';

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
