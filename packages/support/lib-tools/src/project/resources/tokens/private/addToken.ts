import { TokenEntity } from '@noodles-ui/core-types';
import { ProjectContext, TokenContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addToken = (
    project: ProjectContext,
    context: TokenContext,
    entity: TokenEntity,
): TokenEntity | undefined => {
    const { token: items } = project.entities;
    const { resource } = context;

    if (!entity.name) {
        project.addDiagnostic(resource, 'Entity name is empty.');
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

    items.set(key, { context, entity });
    return entity;
};
