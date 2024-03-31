import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getModulesCacheFileName } from './private/getModulesCacheFileName';

export const saveProjectModulesCache = async (compiler: CompilerContext): Promise<void> => {
    const modules = compiler.build.modules;
    const data = Object.fromEntries(modules);
    const json = JSON.stringify(data);
    const fileName = getModulesCacheFileName(compiler);
    await writeFile(fileName, json);

    logSuccess('Updated modules cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
