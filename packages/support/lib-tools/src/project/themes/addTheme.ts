import { logMessage } from '../../cli/logger/logMessage';
import { ProjectContext, ThemeContext } from '../../types/projects';
import { getResourceKey } from '../resources/getResourceKey';

export const addTheme = (project: ProjectContext, context: ThemeContext): void => {
    const { themes: items } = project;
    const { resource, instance: theme } = context;

    if (!theme) {
        project.addDiagnostic(resource, 'No instance generated.');
        return;
    }

    if ('name' in theme && !theme.name) {
        project.addDiagnostic(resource, 'No theme name.');
        return;
    }

    const key = getResourceKey(theme);
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate theme key "${key}."`);
        return;
    }

    logMessage('+ theme', key);
    items.set(key, context);
};
