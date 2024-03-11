import { join } from 'path';

import { ProjectContext } from '../../../types/projects';
import { NUI_GENERATED_FOLDER } from '../../constants';

export const componentListFileName = (project: ProjectContext): string => {
    return join(project.projectPath, `${NUI_GENERATED_FOLDER}/components.ts`);
};
