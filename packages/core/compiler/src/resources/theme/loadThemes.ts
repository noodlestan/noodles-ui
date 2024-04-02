import { ThemeResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext, CompilerOptions } from '../../types';

import { loadTheme } from './loadTheme';

export const loadThemes = async (
    compiler: CompilerContext,
    options: CompilerOptions,
): Promise<void> => {
    const { themes = [] } = compiler.project.resources;
    for (const theme of themes) {
        const context = newResourceContextPublic<ThemeResource>(theme);
        await loadTheme(compiler, context, options);
    }
};
