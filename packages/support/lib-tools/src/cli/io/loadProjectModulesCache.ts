import { readFile } from 'fs/promises';

import { CompilerContext, ProgramModuleContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getModulesCacheFileName } from './private/getModulesCacheFileName';

export const loadProjectModulesCache = async (compiler: CompilerContext): Promise<void> => {
    const modules = compiler.build.modules;
    const fileName = getModulesCacheFileName(compiler);

    const contents = await readFile(fileName);
    const data = JSON.parse(contents.toString()) as { [key: string]: ProgramModuleContext };

    modules.clear();
    const entries = Array.from(Object.entries(data));
    entries.forEach(([key, value]) => {
        modules.set(key, value);
    });

    logSuccess('Loaded modules cache', formatFileNameRelativeToProject(compiler, fileName, true));
};
