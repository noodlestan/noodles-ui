import { TokenContext, TokenEntity } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

export const addToken = (
    compiler: CompilerContext,
    context: TokenContext,
    entity: TokenEntity,
): TokenEntity | undefined => {
    const { token: items } = compiler.entities;
    const { resource } = context;

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    const item = items.get(key);
    if (item) {
        Array.from(context.consumers.values()).forEach(consumer =>
            item.context.consumers.add(consumer),
        );
        return item?.entity;
    }

    context.key = getResourceKey(entity);
    items.set(key, { context, entity });
    return entity;
};
