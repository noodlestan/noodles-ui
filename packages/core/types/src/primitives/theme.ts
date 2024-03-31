import { ColourSchemeName } from './color-schemes';
import { SurfaceTokenMap, TokenMap } from './tokens';

export type ThemeModeTokens = {
    global: TokenMap;
    surfaces: SurfaceTokenMap;
};

export type ThemeTokens = {
    base: ThemeModeTokens;
    alt: ThemeModeTokens;
};

export type Theme = {
    name: string;
    module: string;
    mode: ColourSchemeName;
    component: (props: { [key: string]: unknown }) => unknown;
    extend: string[];
    tokens: ThemeTokens;
};
