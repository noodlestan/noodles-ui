import { ThemeEntity, ThemeTokens } from '@noodles-ui/core-types';

export function themeFactory(tokens: ThemeTokens, overides?: Partial<ThemeEntity>): ThemeEntity {
    const mode = 'dark' in tokens ? 'light' : 'dark';
    return {
        type: 'theme',
        module: '',
        name: '',
        extend: [],
        mode,
        tokens,
        ...overides,
    };
}
