import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../context/newPublicItemContext';

import { loadTheme } from './loadTheme';

export const loadThemes = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.themes.forEach(theme => {
        const context = newPublicItemContext<ThemeResource>(theme);
        loadTheme(project, context);
    });
};
