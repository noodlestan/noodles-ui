import { MixinResource } from '@noodles-ui/core-types';
import { MixinContext, ProjectContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addMixin = (
    project: ProjectContext,
    context: MixinContext,
    entity: MixinResource,
): MixinResource | undefined => {
    const { mixin: items } = project.entities;
    const { resource } = context;

    if (!entity.name) {
        project.addError(resource, 'Entity name is empty.');
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
