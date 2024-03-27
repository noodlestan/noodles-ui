import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../../../build/types';
import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadTheme } from './loadTheme';

export const loadThemes = async (
    project: ProjectContext,
    resource: ProjectResource,
    options: BuildOptions,
): Promise<void> => {
    const { themes } = resource.entities;
    for (const theme of themes) {
        const context = newResourceContextPublic<ThemeResource>(theme);
        await loadTheme(project, context, options);
    }
};
