import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';
import { newContextPublicResource } from '../context/newContextPublicResource';

import { loadTheme } from './loadTheme';

export const loadThemes = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.themes.forEach(theme => {
        const context = newContextPublicResource<ThemeResource>(theme);
        loadTheme(project, context);
    });
};
