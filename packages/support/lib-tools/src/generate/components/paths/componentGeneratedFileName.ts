import { join } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_GENERATED_FOLDER } from '../../constants';

export const componentGeneratedFileName = (
    project: ProjectContext,
    entity: ComponentResource,
): string => {
    const name = entity.name;
    return join(project.projectPath, NUI_GENERATED_FOLDER, `component.${name}.tsx`);
};
