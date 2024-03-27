import { ThemeTokens } from '@noodles-ui/core-types';
import { ProjectContext, ThemeContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../../../build/types';

import { addTheme } from './private/addTheme';
import { loadThemeTokens } from './private/loadThemeTokens';
import { pickThemeTokens } from './private/pickThemeTokens';
import { validateThemeTokens } from './private/validateThemeTokens';

export const loadTheme = async (
    project: ProjectContext,
    context: ThemeContext,
    options: BuildOptions,
): Promise<void> => {
    const { resource: theme } = context;

    const tokens = Array.from(project.entities.token.values());

    if (!options.themeTokensLoader) {
        throw new Error(`BuildOptions:getThemeTokens is required to build themes.`);
    }

    const rawTokens = await loadThemeTokens(project, theme, options.themeTokensLoader);
    if (!rawTokens) {
        return;
    }

    const validatedTokens = validateThemeTokens(project, theme, rawTokens);
    const themeTokens: ThemeTokens = pickThemeTokens(project, theme, tokens, validatedTokens);

    const entity = {
        ...structuredClone(theme),
        tokens: themeTokens,
    };

    addTheme(project, context, entity);
};
