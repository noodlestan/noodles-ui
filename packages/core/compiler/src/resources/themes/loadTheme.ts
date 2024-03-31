import { ThemeContext } from '@noodles-ui/core-entities';
import { ThemeTokens } from '@noodles-ui/core-types';

import { CompilerContext, CompilerOptions } from '../../types';

import { addTheme } from './private/addTheme';
import { loadThemeTokens } from './private/loadThemeTokens';
import { pickThemeTokens } from './private/pickThemeTokens';
import { validateThemeTokens } from './private/validateThemeTokens';

export const loadTheme = async (
    compiler: CompilerContext,
    context: ThemeContext,
    options: CompilerOptions,
): Promise<void> => {
    const { resource: theme } = context;

    const tokens = Array.from(compiler.entities.token.values());

    if (!options.themeTokensLoader) {
        throw new Error(`BuildOptions:getThemeTokens is required to build themes.`);
    }

    const rawTokens = await loadThemeTokens(compiler, theme, options.themeTokensLoader);
    if (!rawTokens) {
        return;
    }

    const validatedTokens = validateThemeTokens(compiler, theme, rawTokens);
    const themeTokens: ThemeTokens = pickThemeTokens(compiler, theme, tokens, validatedTokens);

    const entity = {
        ...structuredClone(theme),
        tokens: themeTokens,
    };

    addTheme(compiler, context, entity);
};
