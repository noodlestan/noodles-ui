import { ThemeEntity } from '@noodles-ui/core-types';
import { ProjectContext, ThemeContext } from '@noodles-ui/support-types';

import { logMessage } from '../../../../cli/logger/logMessage';
import { getResourceKey } from '../../getters/getResourceKey';

export const addTheme = (
    project: ProjectContext,
    context: ThemeContext,
    entity: ThemeEntity,
): void => {
    const { theme: items } = project.entities;
    const { resource } = context;

    if (!entity.name) {
        project.addDiagnostic(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate entity key "${key}".`);
        return;
    }

    logMessage('+ theme', key);
    items.set(key, { context, entity });
};
