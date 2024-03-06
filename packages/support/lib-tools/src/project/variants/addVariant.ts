import { logMessage } from '../../cli/logger/logMessage';
import { ProjectContext, VariantContext } from '../../types/projects';
import { getResourceKey } from '../resources/getResourceKey';

export const addVariant = (project: ProjectContext, context: VariantContext): void => {
    const { items } = project.variants;
    const { resource, instance: variant } = context;

    if (!variant) {
        project.addDiagnostic(resource, 'No instance generated');
        return;
    }

    if ('name' in variant && !variant.name) {
        project.addDiagnostic(resource, 'No variant name');
        return;
    }

    const key = getResourceKey(variant);
    const previous = items.get(key);
    if (previous) {
        context.consumers.forEach(consumer => previous.consumers.add(consumer));
        // // TODO compare options/params/etc... and issue error if different
        // project.addDiagnostic(resource, `Duplicate variant key "${key}".`);
        return;
    }

    logMessage('+ variant', key);
    items.set(key, context);
};
