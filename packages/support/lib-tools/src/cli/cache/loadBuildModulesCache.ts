import {
    CompilerContext,
    getBuildModulesCacheFileName,
    loadBuildModulesCacheFile,
} from '@noodles-ui/core-compiler';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const loadBuildModulesCache = async (compiler: CompilerContext): Promise<void> => {
    const modules = compiler.build.modules;
    const data = loadBuildModulesCacheFile(compiler);

    modules.clear();
    const entries = Array.from(Object.entries(data));
    entries.forEach(([key, value]) => {
        modules.set(key, value);
    });

    const fileName = getBuildModulesCacheFileName(compiler);
    logSuccess('Loaded modules cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
