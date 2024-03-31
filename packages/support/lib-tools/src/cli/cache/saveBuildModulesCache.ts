import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getBuildModulesCacheFileName } from './private/getBuildModulesCacheFileName';

export const saveBuildModulesCache = async (compiler: CompilerContext): Promise<void> => {
    const modules = compiler.build.modules;
    const data = Object.fromEntries(modules);
    const json = JSON.stringify(data);
    const fileName = getBuildModulesCacheFileName(compiler);
    await writeFile(fileName, json);

    logSuccess('Updated modules cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
