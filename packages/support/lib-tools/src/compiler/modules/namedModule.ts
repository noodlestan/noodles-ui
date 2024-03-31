import { ProgramModuleContext } from '@noodles-ui/support-types';

export const namedModule = (name: string, path: string): ProgramModuleContext => ({
    name,
    path,
    filenames: [],
});
