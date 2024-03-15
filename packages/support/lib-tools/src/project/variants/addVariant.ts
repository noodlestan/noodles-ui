import { VariantEntity } from '@noodles-ui/core-types';
import { ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';
import { getResourceKey } from '../resources/getResourceKey';

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
    const previous = items.get(key);

    if (previous) {
        context.consumers.forEach(consumer => previous.context.consumers.add(consumer));
        // // TODO compare options/params/etc... and issue error if different
        // project.addDiagnostic(resource, `Duplicate variant key "${key}".`);
        return previous.entity;
    }

    logMessage('+ variant', key);
    items.set(key, { context, entity });

    return entity;
};
