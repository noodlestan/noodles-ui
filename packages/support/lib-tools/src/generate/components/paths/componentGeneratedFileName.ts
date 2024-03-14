import { join } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_GENERATED_FOLDER } from '../../constants';

export const componentGeneratedFileName = (
    project: ProjectContext,
    instance: ComponentResource,
): string => {
    const name = instance.name;
    return join(project.projectPath, NUI_GENERATED_FOLDER, `component.${name}.tsx`);
};
