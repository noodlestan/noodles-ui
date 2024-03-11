import { VariantInstance } from '@noodles-ui/core-types';

import { logMessage } from '../../cli/logger/logMessage';
import { ProjectContext, VariantContext } from '../../types/projects';
import { getResourceKey } from '../resources/getResourceKey';

export const addVariant = (
    project: ProjectContext,
    context: VariantContext,
): VariantInstance | undefined => {
    const { items } = project.variants;
    const { resource, instance } = context;

    if (!instance) {
        project.addDiagnostic(resource, 'No instance generated');
        return;
    }

    if (!instance.name) {
        project.addDiagnostic(resource, 'Empty variant name');
        return;
    }

    if (!instance.module) {
        project.addDiagnostic(resource, 'Empty module name');
        return;
    }

    const key = getResourceKey(instance);
    const previous = items.get(key);

    if (previous) {
        context.consumers.forEach(consumer => previous.consumers.add(consumer));
        // // TODO compare options/params/etc... and issue error if different
        // project.addDiagnostic(resource, `Duplicate variant key "${key}".`);
        return previous.instance;
    }

    logMessage('+ variant', key);
    items.set(key, context);

    return instance;
};
