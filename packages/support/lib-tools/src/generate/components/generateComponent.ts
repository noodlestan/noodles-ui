import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { generateComponentPrivate } from './component/generateComponentPrivate';
import { generateComponentPublic } from './component/generateComponentPublic';
import { generateComponentScssModule } from './component/generateComponentScssModule';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const p1 = generateComponentPublic(project, component, targetDir);
    const p2 = generateComponentPrivate(project, component, targetDir);
    const p3 = generateComponentScssModule(project, component, targetDir);

    await Promise.all([p1, p2, p3]);
};
