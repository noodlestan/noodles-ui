import { NUI, VariantContext } from '@noodles-ui/core-entities';
import { MixinResource, VariantOwnResource } from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadMixin } from '../../mixin/loadMixin';

export const loadVariantMixin = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantOwnResource,
): MixinResource | undefined => {
    if (variant.mixin) {
        const newResource = {
            ...structuredClone(variant.mixin),
            type: NUI.mixin as 'mixin',
            module: variant.module,
        };
        const newContext = newResourceContextPublicWithConsumer<MixinResource>(
            context,
            newResource,
        );
        // TODO better API to create private/public contexts
        newContext.public = context.public;
        return loadMixin(compiler, newContext);
    }
};
