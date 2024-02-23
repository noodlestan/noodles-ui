import { BuildContext, ProgramModuleContext } from '../types/program';
import { compileFromProjectFile } from '../typescript/compileFromProjectFile';

export const buildProgram = async (projectFile: string): Promise<BuildContext> => {
    const program = await compileFromProjectFile(projectFile);
    const modules = new Map<string, ProgramModuleContext>();

    return { program, modules };
};
