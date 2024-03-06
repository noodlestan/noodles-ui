import { ComponentResource } from '@noodles-ui/core-types';

import { ProjectContext, WithInstance } from '../../types/projects';

import { generateComponentPrivate } from './generateComponentPrivate';
import { generateComponentPublic } from './generateComponentPublic';

export const generateComponent = async (
    project: ProjectContext,
    key: string,
    component: WithInstance<ComponentResource>,
): Promise<void> => {
    const p2 = generateComponentPublic(project, key, component);
    const p1 = generateComponentPrivate(project, key, component);

    await Promise.all([p1, p2]);
};
