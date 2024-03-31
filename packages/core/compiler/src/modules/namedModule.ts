import { ProgramModuleContext } from '../program/types';

export const namedModule = (name: string, path: string): ProgramModuleContext => ({
    name,
    path,
    filenames: [],
});
