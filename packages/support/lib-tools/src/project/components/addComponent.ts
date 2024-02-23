import { ComponentResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ComponentContext, ProjectContext } from '../../types/projects';

export const addComponent = (
    component: ComponentResource,
    project: ProjectContext,
    context: Omit<ComponentContext, 'meta'>,
): void => {
    const { items } = project.components;

    if ('name' in component && !component.name) {
        logError('! component name', { component });
        return;
    }

    const key = component.name || '';
    if (items.has(key)) {
        logError('! duplicate component', key);
        return;
    }

    logMessage('+ component', key);
    const item = { meta: component, ...context };
    items.set(key, item);
};
