import { writeFile } from 'fs/promises';

import { CompilerContext } from '../types';

import { getBuildModulesCacheFileName } from './paths/getBuildModulesCacheFileName';

export const saveBuildModulesCacheFile = async (compiler: CompilerContext): Promise<string> => {
    const modules = compiler.build.modules;
    const data = Object.fromEntries(modules);
    const json = JSON.stringify(data);
    const fileName = getBuildModulesCacheFileName(compiler);
    await writeFile(fileName, json);

    return fileName;
};
