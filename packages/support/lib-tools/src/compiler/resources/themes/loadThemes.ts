import { ProjectResource, ThemeResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../../../cli/types';
import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadTheme } from './loadTheme';

export const loadThemes = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: BuildOptions,
): Promise<void> => {
    const { themes } = project.resources;
    for (const theme of themes) {
        const context = newResourceContextPublic<ThemeResource>(theme);
        await loadTheme(compiler, context, options);
    }
};
