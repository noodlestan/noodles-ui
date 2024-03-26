import { ProjectContext } from '@noodles-ui/support-types';

import { generateGlobalScssFile } from './system/generateGlobalScssFile';
import { generateRootComponent } from './system/generateRootComponent';
import { generateRootScssFile } from './system/generateRootScssFile';

export const generateRoot = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const tasks = [
        generateGlobalScssFile(project, targetDir),
        generateRootComponent(project, targetDir),
        generateRootScssFile(project, targetDir),
    ];

    await Promise.all(tasks);
};
