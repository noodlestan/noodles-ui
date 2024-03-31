import { CompileResult } from '../program/types';

import { compileFromSources } from './private/compileFromSources';

export const compileMultitpleSources = (sourceFiles: string[]): CompileResult => {
    return compileFromSources(sourceFiles);
};
