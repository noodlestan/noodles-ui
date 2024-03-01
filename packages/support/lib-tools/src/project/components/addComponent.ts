import { logMessage } from '../../cli/logMessage';
import { ComponentContext, ProjectContext } from '../../types/projects';
import { getResourceKey } from '../resources/getResourceKey';

export const addComponent = (project: ProjectContext, context: ComponentContext): void => {
    const { items } = project.components;
    const { resource, instance: component } = context;

    if (!component) {
        project.addDiagnostic(resource, 'No instance generated.');
        return;
    }

    if (!component.name) {
        project.addDiagnostic(resource, 'No component name.');
        return;
    }

    const key = getResourceKey(component);
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
        // and then do the initiatlization and push to context.diagnostics[] inside
        return;
    }
    logMessage('+ component', key);
    items.set(key, context);
};
