import { ProjectContext, ThemeContext } from '@noodles-ui/support-types';

import { addTheme } from './addTheme';

export const loadTheme = (project: ProjectContext, context: ThemeContext): void => {
    const { resource: theme } = context;
    const entity = structuredClone(theme);

    addTheme(project, context, entity);
};
