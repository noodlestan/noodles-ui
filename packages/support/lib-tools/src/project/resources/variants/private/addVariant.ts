import { VariantEntity } from '@noodles-ui/core-types';
import { ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { logMessage } from '../../../../cli/logger/logMessage';
import { getResourceKey } from '../../getters/getResourceKey';

export const addVariant = (
    project: ProjectContext,
    context: VariantContext,
    entity: VariantEntity,
): VariantEntity | undefined => {
    const { variant: items } = project.entities;
    const { resource } = context;

    if (!entity) {
        project.addDiagnostic(resource, 'No entity generated');
        return;
    }

    if (!entity.name) {
        project.addDiagnostic(resource, 'Entity name is empty');
        return;
    }

    if (!entity.module) {
        project.addDiagnostic(resource, 'Empty module name');
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

    logMessage('+ variant', key);
    items.set(key, { context, entity });

    return entity;
};
