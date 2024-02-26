import { dirname } from 'path';

import { BuildContext } from '../types/program';
import { compileFromProjectFile } from '../typescript/compileFromProjectFile';

import { getProjectModules } from './getProjectModules';

export const createProgram = async (
    projectFile: string,
    rootPath?: string,
): Promise<BuildContext> => {
    const projectPath = dirname(projectFile);
    const program = await compileFromProjectFile(projectFile);
    const modules = getProjectModules(program, projectPath, rootPath);

    return { program, modules };
};
