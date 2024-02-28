import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';

import { addTheme } from './addTheme';

export const loadThemes = (project: ProjectContext, meta: ProjectResource): void => {
    logInfo('loading themes...');
    meta.themes.forEach(theme => {
        addTheme(project, theme, { public: true });
    });
    console.info('');
};
