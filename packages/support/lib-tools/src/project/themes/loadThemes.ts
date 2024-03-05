import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/functions/logInfo';
import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../context/newPublicItemContext';

import { loadTheme } from './loadTheme';

export const loadThemes = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading themes...');
    projectResource.themes.forEach(theme => {
        const context = newPublicItemContext<ThemeResource>(theme);
        loadTheme(project, context);
    });
    console.info('');
};
