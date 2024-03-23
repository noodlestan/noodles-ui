import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_MODULES_CACHE_FILE, NUI_RESOURCES_FOLDER } from '../../../project/resources/constants';

export const getModulesCacheFileName = (project: ProjectContext): string => {
    return join(project.projectPath, NUI_RESOURCES_FOLDER, NUI_MODULES_CACHE_FILE);
};
