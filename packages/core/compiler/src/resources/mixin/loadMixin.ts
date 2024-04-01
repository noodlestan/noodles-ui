import { MixinContext } from '@noodles-ui/core-entities';
import { MixinResource } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../types';

import { addMixin } from './private/addMixin';
import { loadMixinTokens } from './private/loadMixinTokens';

export const loadMixin = (
    compiler: CompilerContext,
    context: MixinContext,
): MixinResource | undefined => {
    const { resource: mixin } = context;
    const entity = structuredClone(mixin);
    loadMixinTokens(compiler, context, entity);
    return addMixin(compiler, context, entity);
};
