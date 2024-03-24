import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../../../build/types';
import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadTheme } from './loadTheme';

export const loadThemes = (
    project: ProjectContext,
    resource: ProjectResource,
    options: BuildOptions,
): void => {
    const { themes } = resource.entities;
    themes.forEach(theme => {
        const context = newResourceContextPublic<ThemeResource>(theme);
        loadTheme(project, context, options);
    });
};
