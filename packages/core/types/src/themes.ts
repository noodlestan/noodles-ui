import { ColourSchemeName } from './color-schemes';
import { Resource } from './resource';
import { SurfaceTokenMap, TokenMap } from './tokens';

export type ThemeResource = Resource<'theme'> & {
    extend: ThemeResource[];
    mode: ColourSchemeName;
};

export type ThemeModeTokens = {
    global: TokenMap;
    surfaces: SurfaceTokenMap;
};

export type ThemeTokens = {
    base: ThemeModeTokens;
    [mode: string]: ThemeModeTokens;
};

export type ThemeEntity = ThemeResource & {
    tokens: ThemeTokens;
};
