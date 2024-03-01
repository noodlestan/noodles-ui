import { ProgramModuleContext } from '../../types/program';

export const namedModule = (name: string, path: string): ProgramModuleContext => ({
    name,
    path,
    filenames: [],
});
