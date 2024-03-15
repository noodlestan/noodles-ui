import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { generateComponentPrivate } from './generateComponentPrivate';
import { generateComponentPublic } from './generateComponentPublic';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
): Promise<void> => {
    const p2 = generateComponentPublic(project, key, component);
    const p1 = generateComponentPrivate(project, key, component);

    await Promise.all([p1, p2]);
};
