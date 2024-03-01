import { compileFromSources } from './private/compileFromSources';
import { CompileResult } from './types';

export const compileProjectFile = (projectFile: string): CompileResult => {
    return compileFromSources([projectFile]);
};
