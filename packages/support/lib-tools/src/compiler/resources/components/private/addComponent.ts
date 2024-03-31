import { ComponentEntity } from '@noodles-ui/core-types';
import { CompilerContext, ComponentContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    entity: ComponentEntity,
): ComponentEntity | undefined => {
    const { component: items } = compiler.entities;
    const { resource } = context;

    if (!entity) {
        compiler.addError(resource, 'No entity generated.');
        return;
    }

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (context.public) {
        const previous = items.get(key);
        if (previous) {
            if (!previous.context.public) {
                previous.context.public = true;
            } else {
                compiler.addError(resource, `Duplicate component key "${key}".`);
            }
            return;
        }
        items.set(key, { context, entity });
        return;
    }

    const item = items.get(key);
    if (item) {
        Array.from(context.consumers.values()).forEach(consumer =>
            item.context.consumers.add(consumer),
        );
        return item?.entity;
    }

    items.set(key, { context, entity });

    return entity;
};
