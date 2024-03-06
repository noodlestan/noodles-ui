import { join } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../../types/projects';

export const componentGeneratedFileName = (
    project: ProjectContext,
    instance: ComponentResource,
): string => {
    const name = instance.name;
    return join(project.projectPath, `src/generated/component.${name}.tsx`);
};