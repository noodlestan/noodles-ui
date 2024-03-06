import { join } from 'path';

import { ProjectContext } from '../../../types/projects';

export const componentListFileName = (project: ProjectContext): string => {
    return join(project.projectPath, 'src/generated/components.ts');
};
