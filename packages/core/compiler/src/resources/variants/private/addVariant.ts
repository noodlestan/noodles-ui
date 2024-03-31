import { VariantContext, VariantEntity } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

import { validateVariantVars } from './validateVariantVars';

export const addVariant = (
    compiler: CompilerContext,
    context: VariantContext,
    entity: VariantEntity,
): VariantEntity | undefined => {
    const { variant: items } = compiler.entities;
    const { resource } = context;

    if (!entity) {
        compiler.addError(resource, 'No entity generated');
        return;
    }

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty');
        return;
    }

    if (!entity.module) {
        compiler.addError(resource, 'Empty module name');
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

    if (context.public) {
        validateVariantVars(compiler, entity);
    }

    items.set(key, { context, entity });
    return entity;
};
