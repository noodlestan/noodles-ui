import { BuildContext } from '../types/program';
import { compileProjectFile } from '../typescript/compileProjectFile';

import { getProgramModules } from './getProgramModules';
import { getProgramResourceFiles } from './getProgramResourceFiles';

export const createProgram = async (
    projectFile: string,
    projectPath: string,
    rootPath?: string,
): Promise<BuildContext> => {
    const { program, success, result, diagnostics } = compileProjectFile(projectFile);

    const files = getProgramResourceFiles(program);
    const modules = getProgramModules(program, projectPath, rootPath);

    return { program, result, success, diagnostics, files, modules };
};
