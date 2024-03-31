import { compileProjectFile } from '../typescript/compileProjectFile';

import { getProgramResourceFiles } from './getters/getProgramResourceFiles';
import { makeProgramModules } from './private/makeProgramModules';
import { BuildContext } from './types';

export const createProgram = async (
    projectFile: string,
    projectPath: string,
    rootPath?: string,
): Promise<BuildContext> => {
    const { program, success, result, diagnostics } = compileProjectFile(projectFile);

    const timestamp = new Date();
    const files = getProgramResourceFiles(program);
    const fileNames = files.map(file => file.fileName);
    const modules = makeProgramModules(program, projectPath, rootPath);

    return { timestamp, program, result, success, diagnostics, files, fileNames, modules };
};
