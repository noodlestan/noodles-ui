import { ColourSchemeName, ThemeTokens } from '@noodles-ui/core-types';

export function themeTokensFactory(mode: ColourSchemeName = 'dark'): ThemeTokens {
    const alternate = mode === 'dark' ? 'light' : 'dark';
    return {
        base: {
            global: {},
            surfaces: {},
        },
        [alternate]: {
            global: {},
            surfaces: {},
        },
    };
}
