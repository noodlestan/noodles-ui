import { ProjectContext } from '@noodles-ui/support-types';

import { generateThemeComponent } from './themes/generateTheme';
import { generateThemesIndex } from './themes/generateThemesIndex';

export const generateThemes = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const themes = Array.from(project.entities.theme.values());
    const tasks = themes.map(theme => generateThemeComponent(project, targetDir, theme));

    tasks.push(generateThemesIndex(project, targetDir));

    await Promise.all(tasks);
};
