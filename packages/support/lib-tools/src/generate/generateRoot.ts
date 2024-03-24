import { ProjectContext } from '@noodles-ui/support-types';

import { generateRootComponent } from './system/generateRootComponent';
import { generateRootScssFile } from './system/generateRootScssFile';

export const generateRoot = async (project: ProjectContext, targetDir: string): Promise<void> => {
    const tasks = [
        generateRootComponent(project, targetDir),
        generateRootScssFile(project, targetDir),
    ];

    await Promise.all(tasks);
};
