import { SurfaceTokenMap, ThemeTokens, TokenMap } from '@noodles-ui/core-types';
import {
    ProjectContext,
    SurfaceBuildContext,
    ThemeContext,
    TokenBuildContext,
} from '@noodles-ui/support-types';

import { BuildOptions } from '../../../build/types';

import { addTheme } from './private/addTheme';

export const pickTokens = (
    project: ProjectContext,
    tokens: TokenBuildContext[],
    tag: string,
    surface: boolean,
    tokenMap: TokenMap,
): TokenMap => {
    const map = tokens
        .filter(token => token.entity.surface === surface)
        .reduce((acc, token) => {
            // TODO why is token name missing in TokenEntity?
            const name = token.entity.module;
            acc[name] = tokenMap[name];
            return acc;
        }, {} as TokenMap);
    return map;
};

export const pickSurfaceTokens = (
    project: ProjectContext,
    surfaces: SurfaceBuildContext[],
    tokens: TokenBuildContext[],
    themeTag: string,
    surfaceTokenMap: SurfaceTokenMap,
): SurfaceTokenMap => {
    const map = surfaces.reduce((acc, surface) => {
        const name = surface.entity.name;
        const tag = themeTag + '.' + name;
        acc[name] = pickTokens(project, tokens, tag, true, surfaceTokenMap[name]);
        return acc;
    }, {} as SurfaceTokenMap);
    return map;
};

export const loadTheme = async (
    project: ProjectContext,
    context: ThemeContext,
    options: BuildOptions,
): Promise<void> => {
    const { resource: theme } = context;

    const surfaces = Array.from(project.entities.surface.values());
    const tokens = Array.from(project.entities.token.values());

    if (!options.getThemeTokens) {
        throw new Error(`BuildOptions:getThemeTokens is required to build themes.`);
    }

    const inputTokens = await options.getThemeTokens(theme.name);

    // console.log(surfaces, tokens, inputTokens);

    const themeTokens: ThemeTokens = {
        base: {
            global: pickTokens(project, tokens, 'base.global', false, inputTokens.base.global),
            surfaces: pickSurfaceTokens(
                project,
                surfaces,
                tokens,
                'base.surface',
                inputTokens.base.surfaces,
            ),
        },
        alt: {
            global: pickTokens(project, tokens, 'alt.global', false, inputTokens.alt.global),
            surfaces: pickSurfaceTokens(
                project,
                surfaces,
                tokens,
                'alt.surface',
                inputTokens.alt.surfaces,
            ),
        },
    };

    const entity = {
        ...structuredClone(theme),
        tokens: themeTokens,
    };

    addTheme(project, context, entity);
};
