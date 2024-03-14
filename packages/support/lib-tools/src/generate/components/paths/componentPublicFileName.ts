import { join } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_COMPONENTS_SRC_FOLDER } from '../../constants';

export const componentPublicFileName = (
    project: ProjectContext,
    instance: ComponentResource,
): string => {
    const name = instance.name;
    return join(project.projectPath, NUI_COMPONENTS_SRC_FOLDER, `/${name}/${name}.tsx`);
};
