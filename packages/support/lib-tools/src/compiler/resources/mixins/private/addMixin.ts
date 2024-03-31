import { MixinResource } from '@noodles-ui/core-types';
import { CompilerContext, MixinContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addMixin = (
    compiler: CompilerContext,
    context: MixinContext,
    entity: MixinResource,
): MixinResource | undefined => {
    const { mixin: items } = compiler.entities;
    const { resource } = context;

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    const item = items.get(key);
    if (item) {
        // TODO merge references
        // TODO compare
        Array.from(context.consumers.values()).forEach(consumer =>
            item.context.consumers.add(consumer),
        );
        return item?.entity;
    }

    items.set(key, { context, entity });

    return entity;
};
