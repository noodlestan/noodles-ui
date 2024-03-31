import { readFile } from 'fs/promises';

import { ProgramModuleContext } from '../program/types';
import { CompilerContext } from '../types';

import { getBuildModulesCacheFileName } from './paths/getBuildModulesCacheFileName';

export const loadBuildModulesCacheFile = async (
    compiler: CompilerContext,
): Promise<{ [key: string]: ProgramModuleContext }> => {
    const fileName = getBuildModulesCacheFileName(compiler);
    const contents = await readFile(fileName);
    return JSON.parse(contents.toString()) as { [key: string]: ProgramModuleContext };
};
