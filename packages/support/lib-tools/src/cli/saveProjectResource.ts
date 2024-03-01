import { writeFile } from 'fs/promises';
import { join } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';

import { NUI_CACHE_FOLDER, NUI_RESOURCES_CACHE_FILE } from '../project/resources/constants';
import { ProjectContext } from '../types/projects';

import { formatFileNameRelativeToProject } from './formatFileNameRelativeToProject';
import { logSuccess } from './logSuccess';

export const saveProjectResource = async (
    project: ProjectContext,
    resource: ProjectResource,
): Promise<void> => {
    const json = JSON.stringify(resource);
    const file = join(project.projectPath, NUI_CACHE_FOLDER, NUI_RESOURCES_CACHE_FILE);
    await writeFile(file, json);

    logSuccess(
        'Updated resource cache',
        formatFileNameRelativeToProject(project.build.modules, file, true),
    );
};
