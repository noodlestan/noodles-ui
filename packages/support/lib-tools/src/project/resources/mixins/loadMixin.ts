import { MixinResource } from '@noodles-ui/core-types';
import { CompilerContext, MixinContext } from '@noodles-ui/support-types';

import { addMixin } from './private/addMixin';

export const loadMixin = (
    compiler: CompilerContext,
    context: MixinContext,
): MixinResource | undefined => {
    const { resource: mixin } = context;
    const entity = structuredClone(mixin);
    return addMixin(compiler, context, entity);
};
