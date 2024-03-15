import { ComponentInstance } from '@noodles-ui/core-types';
import { ComponentContextWithInstance, ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';
import { getResourceKey } from '../resources/getResourceKey';

export const addComponent = (
    project: ProjectContext,
    context: ComponentContextWithInstance,
): ComponentInstance | undefined => {
    const { component: items } = project.entities;
    const { resource, instance } = context;

    if (!instance) {
        project.addDiagnostic(resource, 'No instance generated.');
        return;
    }

    if (!instance.name) {
        project.addDiagnostic(resource, 'No component name.');
        return;
    }

    const key = getResourceKey(instance);
    if (context.public) {
        const previous = items.get(key);
        if (previous) {
            if (!previous.public) {
                previous.public = true;
                logMessage('  (+ public)', key);
            } else {
                project.addDiagnostic(resource, `Duplicate component key "${key}".`);
            }
            return;
        }
        logMessage('+ component (public)', key);
        items.set(key, context);
        return;
    }

    if (items.has(key)) {
        // TODO merge references
        // TODO compare
        // TODO stick diagnostics to components (and merge them)
        // const d = project.addDiagnostic(...)
        // context.diagnostics.push(f)
        // OR simply:
        // project.addDiagnostic(source, message, context?: ItemContext) <--
        // and then do the initialization and push to context.diagnostics[] inside
        return;
    }
    logMessage('+ component', key);
    items.set(key, context);

    return instance;
};
