import { MixinInlineResource, MixinResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

export const createMixinImportStatement = (
    compiler: CompilerContext,
    mixin: MixinResource | MixinInlineResource,
): string => {
    return `@import '${mixin.source}';`;
};
