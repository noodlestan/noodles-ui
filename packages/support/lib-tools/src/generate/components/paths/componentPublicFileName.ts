import { join } from 'path';

import { ComponentEntity } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

export const componentPublicFileName = (
    project: ProjectContext,
    entity: ComponentEntity,
): string => {
    const name = entity.name;
    // TODO BuildOptions getComponentPath(entity) => string
    return join(project.projectPath, `src/components/${name}/${name}.tsx`);
};
