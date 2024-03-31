import { CompilerContext } from '@noodles-ui/core-compiler';
import { MixinInlineResource, MixinResource } from '@noodles-ui/core-resources';

export const createMixinImportStatement = (
    compiler: CompilerContext,
    mixin: MixinResource | MixinInlineResource,
): string => {
    return `@import '${mixin.source}';`;
};
