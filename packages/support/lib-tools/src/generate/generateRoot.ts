import { ProjectContext } from '@noodles-ui/support-types';

import { generateGlobalScssFile } from './system/generateGlobalScssFile';
import { generateIndexFile } from './system/generateIndexFile';
import { generateRootComponent } from './system/generateRootComponent';
import { generateRootScssFile } from './system/generateRootScssFile';

export const generateRoot = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const tasks = [
        generateIndexFile(project, targetDir),
        generateGlobalScssFile(project, targetDir),
        generateRootComponent(project, targetDir),
        generateRootScssFile(project, targetDir),
    ];

    await Promise.all(tasks);
};
