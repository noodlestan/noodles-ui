import { NUI, SystemContext } from '@noodles-ui/core-entities';
import { MixinResource, SystemResource, getResourceTypedKey } from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadMixin } from '../../mixin/loadMixin';

export const loadSystemMixin = (
    compiler: CompilerContext,
    context: SystemContext,
    system: SystemResource,
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
            system,
            `Could not load mixin "${mixinResource.name}" because resolution failed.`,
        );
        return;
    }
    context.consumes.add(getResourceTypedKey(mixin));

    return mixin;
};
