import { compileFromSources } from './private/compileFromSources';
import { CompileResult } from './types';

export const compileMultitpleSources = (sourceFiles: string[]): CompileResult => {
    return compileFromSources(sourceFiles);
};
