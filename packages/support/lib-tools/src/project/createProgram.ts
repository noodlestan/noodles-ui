import { BuildContext } from '../types/program';
import { compileProject } from '../typescript/compileProject';

import { getProjectModules } from './getProjectModules';

export const createProgram = async (
    projectFile: string,
    projectPath: string,
    rootPath?: string,
): Promise<BuildContext> => {
    const program = await compileProject(projectFile);
    const modules = getProjectModules(program, projectPath, rootPath);

    console.log('--> modules', modules);

    return { program, modules };
};
