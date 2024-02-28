import { ComponentResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ComponentContext, ProjectContext } from '../../types/projects';

export const addComponent = (
    project: ProjectContext,
    component: ComponentResource,
    context: Omit<ComponentContext, 'meta'>,
): void => {
    const { items } = project.components;

    if ('name' in component && !component.name) {
        logError('! component name', { component });
        return;
    }

    const key = component.name || '';
    if (context.public) {
        if (items.has(key)) {
            logError('! duplicate component', key);
            return;
        }
        logMessage('+ component (public)', key);
        const item = { meta: component, ...context };
        items.set(key, item);
    } else {
        const privateKey = component.module + '/' + component.name;
        if (items.has(privateKey)) {
            logError('! already component', privateKey);
            return;
        }
        logMessage('+ component', privateKey);
        const item = { meta: component, ...context };
        items.set(privateKey, item);
    }
};
