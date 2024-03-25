import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';

import { generateThemeConstant } from './Theme/generateThemeConstant';
import { generateThemeScssVars } from './Theme/generateThemeScssVars';
import { generateThemeTypescriptTokens } from './Theme/generateThemeTypescriptTokens';

export const generateThemeComponent = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const tasks = [
        generateThemeConstant(project, targetDir, theme),
        generateThemeTypescriptTokens(project, targetDir, theme),
        generateThemeScssVars(project, targetDir, theme),
    ];

    await Promise.all(tasks);
};
