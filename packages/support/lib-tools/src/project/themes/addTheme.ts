import { ThemeResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ProjectContext, ThemeContext } from '../../types/projects';

export const addTheme = (
    project: ProjectContext,
    theme: ThemeResource,
    context: Omit<ThemeContext, 'meta'>,
): void => {
    const { items } = project.themes;

    if ('name' in theme && !theme.name) {
        logError('! theme name', { theme });
        return;
    }

    const key = theme.name || '';
    if (items.has(key)) {
        logError('! duplicate theme', key);
        return;
    }

    logMessage('+ theme', key);
    const item = { meta: theme, ...context };
    items.set(key, item);
};
