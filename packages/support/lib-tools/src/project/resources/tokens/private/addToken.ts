import { TokenEntity } from '@noodles-ui/core-types';
import { ProjectContext, TokenContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addToken = (
    project: ProjectContext,
    context: TokenContext,
    entity: TokenEntity,
): void => {
    const { token: items } = project.entities;
    const { resource } = context;

    if ('name' in entity && !entity.name) {
        project.addDiagnostic(resource, 'No token name.');
        return;
    }

    // TODO these should already be all named tokens?
    // or should we store the patterns as private resources as well? with source reference, etc...
    const name = 'name' in entity ? entity.name : entity.pattern;
    const key = getResourceKey({ ...entity, name });
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate token key "${key}".`);
        return;
    }

    items.set(key, { context, entity });
};
