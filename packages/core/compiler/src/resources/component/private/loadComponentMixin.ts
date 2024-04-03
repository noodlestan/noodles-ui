import { ComponentContext, NUI } from '@noodles-ui/core-entities';
import {
    ComponentRenderResource,
    MixinResource,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadMixin } from '../../mixin/loadMixin';

export const loadComponentMixin = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
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
    context.consumes.add(getResourceTypedKey(mixin));

    return mixin;
};
