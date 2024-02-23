import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

import { addTheme } from './addTheme';

export const loadThemes = (project: ProjectContext, meta: ProjectResource): void => {
    meta.themes.forEach(theme => {
        addTheme(theme, project, { public: true });
    });
};
