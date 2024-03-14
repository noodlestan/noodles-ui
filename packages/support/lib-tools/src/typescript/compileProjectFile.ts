import { CompileResult } from '@noodles-ui/support-types';

import { compileFromSources } from './private/compileFromSources';

export const compileProjectFile = (projectFile: string): CompileResult => {
    return compileFromSources([projectFile]);
};
