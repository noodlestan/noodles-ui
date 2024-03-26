import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { generateComponentLive } from './Components/generateComponentLive';
import { generateComponentPrivate } from './Components/generateComponentPrivate';
import { generateComponentPublic } from './Components/generateComponentPublic';
import { generateComponentScssModule } from './Components/generateComponentScssModule';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const tasks = [
        generateComponentPublic(project, component, targetDir),
        generateComponentPrivate(project, component, targetDir),
        generateComponentLive(project, component, targetDir),
        generateComponentScssModule(project, component, targetDir),
    ];

    await Promise.all(tasks);
};
