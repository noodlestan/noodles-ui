import { CompileResult } from '@noodles-ui/support-types';

import { compileFromSources } from './private/compileFromSources';

export const compileMultitpleSources = (sourceFiles: string[]): CompileResult => {
    return compileFromSources(sourceFiles);
};
