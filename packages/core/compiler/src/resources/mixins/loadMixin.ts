import { MixinContext } from '@noodles-ui/core-entities';
import { MixinResource } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../types';

import { addMixin } from './private/addMixin';

export const loadMixin = (
    compiler: CompilerContext,
    context: MixinContext,
): MixinResource | undefined => {
    const { resource: mixin } = context;
    const entity = structuredClone(mixin);
    return addMixin(compiler, context, entity);
};
