import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadTheme } from './loadTheme';

export const loadThemes = (project: ProjectContext, resource: ProjectResource): void => {
    const { themes } = resource.entities;
    themes.forEach(theme => {
        const context = newResourceContextPublic<ThemeResource>(theme);
        loadTheme(project, context);
    });
};
