import { CompilerContext } from '@noodles-ui/core-compiler';
import { gray } from 'kleur';

export const hintExpandPattern = (compiler: CompilerContext, pattern: string): string => {
    if (!compiler.interactive.hints || compiler.interactive.expand.includes(pattern)) {
        return '';
    }
    return gray().italic(`--expand ${pattern}`);
};
