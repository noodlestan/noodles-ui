import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE } from '../../../project/resources/constants';

export const getModulesCacheFileName = (project: ProjectContext): string => {
    return join(project.projectPath, NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE);
};
