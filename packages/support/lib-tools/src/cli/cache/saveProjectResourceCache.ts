import { writeFile } from 'fs/promises';
import { join } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_CACHE_FILE, NUI_RESOURCES_DIR } from '../../compiler/resources/constants';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveProjectResourceCache = async (
    compiler: CompilerContext,
    resource: ProjectResource,
): Promise<void> => {
    const data = resource;
    const json = JSON.stringify(data);
    const fileName = join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_RESOURCES_CACHE_FILE);
    await writeFile(fileName, json);

    logSuccess('Updated resource cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
