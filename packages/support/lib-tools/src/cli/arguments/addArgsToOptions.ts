import { CompilerOptions } from '@noodles-ui/core-compiler';

import { getExpandPatterns } from './getExpandPatterns';
import { getShowHints } from './getShowHints';

export const addArgsToOptions = (options: CompilerOptions): CompilerOptions => {
    const { interactive = {}, ...rest } = options;

    const showHints = getShowHints();
    const expandPatterns = getExpandPatterns();

    interactive.hints = interactive.hints || showHints;
    interactive.expand = interactive.expand || [];
    interactive.expand.push(...expandPatterns);

    return { interactive, ...rest };
};
