import { writeFile } from 'fs/promises';
import { join } from 'path';

import { ProjectResource } from '@noodles-ui/core-resources';

import { NUI_RESOURCES_CACHE_FILE, NUI_RESOURCES_DIR } from '../resources/constants';
import { CompilerContext } from '../types';

export const saveProjectResourceCacheFile = async (
    compiler: CompilerContext,
    resource: ProjectResource,
): Promise<string> => {
    const data = resource;
    const json = JSON.stringify(data);
    const fileName = join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_RESOURCES_CACHE_FILE);
    await writeFile(fileName, json);
    return fileName;
};
