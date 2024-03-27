import { ThemeEntity } from '@noodles-ui/core-types';
import { ProjectContext, ThemeContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addTheme = (
    project: ProjectContext,
    context: ThemeContext,
    entity: ThemeEntity,
): void => {
    const { theme: items } = project.entities;
    const { resource } = context;

    if (!entity.name) {
        project.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (items.has(key)) {
        project.addError(resource, `Duplicate entity key "${key}".`);
        return;
    }

    items.set(key, { context, entity });
};
