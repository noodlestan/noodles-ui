import { writeFile } from 'fs/promises';
import { join } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_CACHE_FILE, NUI_RESOURCES_DIR } from '../../project/resources/constants';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveProjectResourceCache = async (
    project: ProjectContext,
    resource: ProjectResource,
): Promise<void> => {
    const data = resource;
    const json = JSON.stringify(data);
    const fileName = join(project.projectPath, NUI_RESOURCES_DIR, NUI_RESOURCES_CACHE_FILE);
    await writeFile(fileName, json);

    logSuccess('Updated resource cache', formatFileNameRelativeToProject(project, fileName, true));
};
