import { ComponentEntity } from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../../cli/logger/logMessage';
import { getResourceKey } from '../getters/getResourceKey';

export const addComponent = (
    project: ProjectContext,
    context: ComponentContext,
    entity: ComponentEntity,
): ComponentEntity | undefined => {
    const { component: items } = project.entities;
    const { resource } = context;

    if (!entity) {
        project.addDiagnostic(resource, 'No entity generated.');
        return;
    }

    if (!entity.name) {
        project.addDiagnostic(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (context.public) {
        const previous = items.get(key);
        if (previous) {
            if (!previous.context.public) {
                previous.context.public = true;
                logMessage('  (+ public)', key);
            } else {
                project.addDiagnostic(resource, `Duplicate component key "${key}".`);
            }
            return;
        }
        logMessage('+ component (public)', key);
        items.set(key, { context, entity });
        return;
    }

    const item = items.get(key);
    if (item) {
        Array.from(context.consumers.values()).forEach(consumer =>
            item.context.consumers.add(consumer),
        );
        return item?.entity;
    }
    logMessage('+ component', key);
    items.set(key, { context, entity });

    return entity;
};