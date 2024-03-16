import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { generateComponentPrivate } from './generateComponentPrivate';
import { generateComponentPublic } from './generateComponentPublic';
import { generateComponentScssModule } from './generateComponentScssModule';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
): Promise<void> => {
    const p1 = generateComponentPublic(project, component);
    const p2 = generateComponentPrivate(project, component);
    const p3 = generateComponentScssModule(project, component);

    await Promise.all([p1, p2, p3]);
};
