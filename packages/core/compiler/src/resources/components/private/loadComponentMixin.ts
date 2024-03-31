import { ComponentContext, NUI } from '@noodles-ui/core-entities';
import { ComponentOwnResource, MixinResource } from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadMixin } from '../../mixins/loadMixin';

export const loadComponentMixin = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    mixinResource: MixinResource,
): MixinResource | undefined => {
    const newResource = {
        ...structuredClone(mixinResource),
        type: NUI.mixin as 'mixin',
    };
    const newContext = newResourceContextPublicWithConsumer<MixinResource>(context, newResource);

    const mixin = loadMixin(compiler, newContext);
    if (!mixin) {
        compiler.addError(
            component,
            `Could not load mixin "${mixinResource.name}" because resolution failed.`,
        );
        return;
    }

    return mixin;
};
