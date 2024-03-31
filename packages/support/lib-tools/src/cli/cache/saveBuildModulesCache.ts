import { CompilerContext, saveBuildModulesCacheFile } from '@noodles-ui/core-compiler';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveBuildModulesCache = async (compiler: CompilerContext): Promise<void> => {
    const fileName = await saveBuildModulesCacheFile(compiler);

    logSuccess('Updated modules cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
