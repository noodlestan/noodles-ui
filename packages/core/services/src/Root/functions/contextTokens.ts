import { surfacesStore } from '../stores/surfacesStore';
import type { ColourSchemeName, Surface, Theme, TokenMap } from '../types';

// TODO memo
export const contextTokens = (mode: ColourSchemeName, theme: Theme, surface: Surface): TokenMap => {
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
    const invertTokens =
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
        ...invertTokens,
    };
};
