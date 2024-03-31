import { ProjectContext } from '@noodles-ui/support-types';

import { generateGlobalScssFile } from './system/generateGlobalScssFile';
import { generateIndexFile } from './system/generateIndexFile';
import { generateRootComponent } from './system/generateRootComponent';
import { generateRootCssTokens } from './system/generateRootCssTokens';
import { generateRootScssModule } from './system/generateRootScssModule';

export const generateRoot = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const tasks = [
        generateIndexFile(project, targetDir),
        generateGlobalScssFile(project, targetDir),
        generateRootComponent(project, targetDir),
        generateRootCssTokens(project, targetDir),
        generateRootScssModule(project, targetDir),
    ];

    await Promise.all(tasks);
};
