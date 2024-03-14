import { BuildContext } from '@noodles-ui/support-types';

import { compileProjectFile } from '../typescript/compileProjectFile';

import { getProgramModules } from './getProgramModules';
import { getProgramResourceFiles } from './getProgramResourceFiles';

export const createProgram = async (
    projectFile: string,
    projectPath: string,
    rootPath?: string,
): Promise<BuildContext> => {
    const { program, success, result, diagnostics } = compileProjectFile(projectFile);

    const timestamp = new Date();
    const files = getProgramResourceFiles(program);
    const modules = getProgramModules(program, projectPath, rootPath);

    return { timestamp, program, result, success, diagnostics, files, modules };
};
