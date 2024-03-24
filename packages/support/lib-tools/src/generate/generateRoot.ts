import { ProjectContext } from '@noodles-ui/support-types';

import { generateRootComponent } from './system/generateRootComponent';

export const generateRoot = async (project: ProjectContext, targetDir: string): Promise<void> => {
    await generateRootComponent(project, targetDir);
};
