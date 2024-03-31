import { CompileResult } from '../program/types';

import { compileFromSources } from './private/compileFromSources';

export const compileProjectFile = (projectFile: string): CompileResult => {
    return compileFromSources([projectFile]);
};
