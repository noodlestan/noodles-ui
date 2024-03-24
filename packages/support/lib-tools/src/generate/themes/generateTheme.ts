import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';

import { generateThemeConstant } from './Theme/generateThemeConstant';
import { generateThemeTypescriptTokens } from './Theme/generateThemeTypescriptTokens';

export const generateThemeComponent = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    await generateThemeConstant(project, targetDir, theme);
    await generateThemeTypescriptTokens(project, targetDir, theme);
};
