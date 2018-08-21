import type { ColourSchemeName, Theme, TokenMap } from '../../types';

export const themeTokens = (theme: Theme, mode: ColourSchemeName): TokenMap => {
    const extendedThemes = theme.extends.reduce((acc, theme) => {
        return { ...acc, ...themeTokens(theme, mode) };
    }, {});

    const baseTokens = theme.tokens.base.global;
    const invertTokens = theme.mode !== mode ? theme.tokens.invert.global : {};

    return { ...extendedThemes, ...baseTokens, ...invertTokens };
};
