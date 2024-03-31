import { MixinContext } from '@noodles-ui/core-entities';
import { MixinResource, getResourceKey } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

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
