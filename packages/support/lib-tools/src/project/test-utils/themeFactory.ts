import { ThemeEntity, ThemeTokens } from '@noodles-ui/core-types';

export function themeFactory(tokens: ThemeTokens, overides?: Partial<ThemeEntity>): ThemeEntity {
    return {
        type: 'theme',
        module: '',
        name: '',
        extend: [],
        mode: 'dark',
        tokens,
        ...overides,
    };
}
