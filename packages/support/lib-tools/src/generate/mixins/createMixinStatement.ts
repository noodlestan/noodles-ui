import { CompilerContext } from '@noodles-ui/core-compiler';
import { MixinInlineResource, MixinVars } from '@noodles-ui/core-resources';

export const createMixinStatement = (
    compiler: CompilerContext,
    mixin: MixinInlineResource,
    vars?: MixinVars,
): string => {
    const actualVars = { ...mixin.vars, ...vars };
    return Object.entries(actualVars).reduce((acc, [name, value]) => {
        if (typeof value === 'string') {
            return acc.replace(`#{${name}}`, value);
        }
        return acc;
    }, mixin.implementation);
};
