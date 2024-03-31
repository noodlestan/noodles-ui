import { CompilerContext } from '@noodles-ui/core-compiler';

import { generateThemeComponent } from './themes/generateTheme';
import { generateThemesIndex } from './themes/generateThemesIndex';

export const generateThemes = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const themes = Array.from(compiler.entities.theme.values());
    const tasks = themes.map(theme => generateThemeComponent(compiler, targetDir, theme));

    tasks.push(generateThemesIndex(compiler, targetDir));

    await Promise.all(tasks);
};
