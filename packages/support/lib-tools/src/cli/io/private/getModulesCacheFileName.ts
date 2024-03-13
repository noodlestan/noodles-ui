import { join } from 'path';

import { NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE } from '../../../project/resources/constants';
import { ProjectContext } from '../../../types/projects';

export const getModulesCacheFileName = (project: ProjectContext): string => {
    return join(project.projectPath, NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE);
};
