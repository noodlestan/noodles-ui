import { SystemContext, SystemEntity } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

export const addSystem = (
    compiler: CompilerContext,
    context: SystemContext,
    entity: SystemEntity,
): SystemEntity | undefined => {
    const { system: items } = compiler.entities;
    const { resource } = context;

    if (items.size) {
        compiler.addError(resource, 'There can be only one system entity in the project.');
        return;
    }

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    context.key = key;
    items.set(key, { context, entity });
    return entity;
};
