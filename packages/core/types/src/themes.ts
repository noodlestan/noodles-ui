import { ColourSchemeName } from './color-schemes';
import { SurfaceTokenMap, TokenMap } from './tokens';

export type ThemeResource = {
    name: string;
    extends: ThemeResource[];
    mode: ColourSchemeName;
    tokens: {
        base: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
        [mode: string]: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
    };
};
