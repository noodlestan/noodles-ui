import { ThemeContext, ThemeEntity } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

export const addTheme = (
    compiler: CompilerContext,
    context: ThemeContext,
    entity: ThemeEntity,
): void => {
    const { theme: items } = compiler.entities;
    const { resource } = context;

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (items.has(key)) {
        compiler.addError(resource, `Duplicate entity key "${key}".`);
        return;
    }

    items.set(key, { context, entity });
};
