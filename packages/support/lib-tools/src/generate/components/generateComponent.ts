import { ComponentResource } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../types/projects';

import { generateComponentPrivate } from './generateComponentPrivate';
import { generateComponentPublic } from './generateComponentPublic';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: ComponentContext,
    instance: ComponentResource,
): Promise<void> => {
    const p2 = generateComponentPublic(project, key, component, instance);
    const p1 = generateComponentPrivate(project, key, component, instance);

    await Promise.all([p1, p2]);
};
