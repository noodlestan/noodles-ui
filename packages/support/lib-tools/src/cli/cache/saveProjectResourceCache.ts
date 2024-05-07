import { CompilerContext, saveProjectResourceCacheFile } from '@noodles-ui/core-compiler';
import { NUIProjectResource } from '@noodles-ui/core-resources';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveProjectResourceCache = async (
    compiler: CompilerContext,
    resource: NUIProjectResource,
): Promise<void> => {
    const fileName = await saveProjectResourceCacheFile(compiler, resource);

    logSuccess('Updated resource cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
