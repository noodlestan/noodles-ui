import type { ColourSchemeName, Surface, Theme, TokenMap } from '@noodles-ui/core-types';
import { merge } from 'ts-deepmerge';

import { themesStore } from '../stores';
import { surfacesStore } from '../stores/surfacesStore';

export const contextTokens = (mode: ColourSchemeName, theme: Theme, surface: Surface): TokenMap => {
    const { themeByName } = themesStore;
    const { surfaceByName } = surfacesStore;

    const extendedThemes = theme.extend.reduce((acc, themeName) => {
        return {
            ...acc,
            ...contextTokens(mode, themeByName(themeName), surface),
        };
    }, {});

    const extendedSurfaces = surface.extend.reduce((acc, surfaceName) => {
        return {
            ...acc,
            ...contextTokens(mode, theme, surfaceByName(surfaceName)),
        };
    }, {});

    const baseTokens = {
        ...theme.tokens.base.global,
        ...theme.tokens.base.surfaces[surface.name],
    };
    const modeTokens =
        theme.mode !== mode
            ? {
                  ...theme.tokens.alt.global,
                  ...theme.tokens.alt.surfaces[surface.name],
              }
            : {};

    return merge(extendedThemes, extendedSurfaces, baseTokens, modeTokens);
};
