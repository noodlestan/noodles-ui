import { CompilerContext, saveProjectResourceCacheFile } from '@noodles-ui/core-compiler';
import { ProjectResource } from '@noodles-ui/core-resources';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveProjectResourceCache = async (
    compiler: CompilerContext,
    resource: ProjectResource,
): Promise<void> => {
    const fileName = await saveProjectResourceCacheFile(compiler, resource);

    logSuccess('Updated resource cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
