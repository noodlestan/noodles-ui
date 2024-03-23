import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { generateThemeComponent } from './themes/generateThemeComponent';
import { generateThemesIndex } from './themes/generateThemesIndex';

export const factory = ts.factory;

export const generateThemes = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const themes = Array.from(project.entities.theme.values());
    const promises = themes.map(theme => generateThemeComponent(project, targetDir, theme));

    promises.push(generateThemesIndex(project, targetDir));

    await Promise.all(promises);
};
