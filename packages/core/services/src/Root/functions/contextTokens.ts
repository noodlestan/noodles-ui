import type { ColourSchemeName, ThemeResource, TokenMap } from '@noodles-ui/core-types';

import { surfacesStore } from '../stores/surfacesStore';
import type { Surface } from '../types';

// TODO memo
export const contextTokens = (
    mode: ColourSchemeName,
    theme: ThemeResource,
    surface: Surface,
): TokenMap => {
    // TODO revalidate if type of theme.extends should be Array<Theme> or Array<string> (theme name, which requires the findTheme() as is currently in contextTokens() bellow )

    const { findSurface } = surfacesStore;

    const extendedThemes = theme.extends.reduce((acc, theme) => {
        return {
            ...acc,
            ...contextTokens(mode, theme, surface),
        };
    }, {});

    const extendedSurfaces = surface.extends.reduce((acc, surfaceName) => {
        return {
            ...acc,
            ...contextTokens(mode, theme, findSurface(surfaceName)),
        };
    }, {});

    const baseTokens = {
        ...theme.tokens.base.global,
        ...theme.tokens.base.surfaces[surface.name],
    };
    const modeTokens =
        theme.mode !== mode && theme.tokens[mode]
            ? {
                  ...theme.tokens[mode].global,
                  ...theme.tokens[mode].surfaces[surface.name],
              }
            : {};

    return {
        ...extendedThemes,
        ...extendedSurfaces,
        ...baseTokens,
        ...modeTokens,
    };
};
