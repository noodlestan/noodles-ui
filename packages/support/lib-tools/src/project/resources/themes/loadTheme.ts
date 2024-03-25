import { SurfaceTokenMap, ThemeResource, ThemeTokens, TokenMap } from '@noodles-ui/core-types';
import {
    ProjectContext,
    SurfaceBuildContext,
    ThemeContext,
    TokenBuildContext,
} from '@noodles-ui/support-types';

import { BuildOptions, ThemeTokensLoader } from '../../../build/types';

import { addTheme } from './private/addTheme';
import { validateThemeTokens } from './private/validateThemeTokens';

const pickTokens = (
    project: ProjectContext,
    tokens: TokenBuildContext[],
    tag: string,
    surface: boolean,
    tokenMap: TokenMap = {},
): TokenMap => {
    const map = tokens
        .filter(token => token.entity.surface === surface)
        .reduce((acc, token) => {
            // TODO why is token name missing in TokenEntity?
            const name = token.entity.module;
            if (name in tokenMap) {
                acc[name] = tokenMap[name];
            }
            return acc;
        }, {} as TokenMap);
    return map;
};

const pickSurfaceTokens = (
    project: ProjectContext,
    surfaces: SurfaceBuildContext[],
    tokens: TokenBuildContext[],
    themeTag: string,
    surfaceTokenMap: SurfaceTokenMap = {},
): SurfaceTokenMap => {
    const map = surfaces.reduce((acc, surface) => {
        const name = surface.entity.name;
        const tag = themeTag + '.' + name;
        acc[name] = pickTokens(project, tokens, tag, true, surfaceTokenMap[name]);
        return acc;
    }, {} as SurfaceTokenMap);
    return map;
};

const loadThemeTokens = async (
    project: ProjectContext,
    theme: ThemeResource,
    getThemeTokens: ThemeTokensLoader,
): Promise<ThemeTokens | undefined> => {
    try {
        const loaded = await getThemeTokens(project, theme);
        return loaded?.tokens;
    } catch (err) {
        project.addDiagnostic('project', (err as Error).message);
    }
};

const pickThemeTokens = (
    project: ProjectContext,
    tokens: TokenBuildContext[],
    inputTokens?: ThemeTokens,
): ThemeTokens => {
    const surfaces = Array.from(project.entities.surface.values());

    return {
        base: {
            global: pickTokens(project, tokens, 'base.global', false, inputTokens?.base.global),
            surfaces: pickSurfaceTokens(
                project,
                surfaces,
                tokens,
                'base.surface',
                inputTokens?.base.surfaces,
            ),
        },
        alt: {
            global: pickTokens(project, tokens, 'alt.global', false, inputTokens?.alt.global),
            surfaces: pickSurfaceTokens(
                project,
                surfaces,
                tokens,
                'alt.surface',
                inputTokens?.alt.surfaces,
            ),
        },
    };
};

export const loadTheme = async (
    project: ProjectContext,
    context: ThemeContext,
    options: BuildOptions,
): Promise<void> => {
    const { resource: theme } = context;

    const tokens = Array.from(project.entities.token.values());

    if (!options.themeTokensLoader) {
        throw new Error(`BuildOptions:getThemeTokens is required to build themes.`);
    }

    const rawTokens = await loadThemeTokens(project, theme, options.themeTokensLoader);
    if (!rawTokens) {
        return;
    }

    const validatedTokens = validateThemeTokens(project, theme, rawTokens);
    const themeTokens: ThemeTokens = pickThemeTokens(project, tokens, validatedTokens);

    const entity = {
        ...structuredClone(theme),
        tokens: themeTokens,
    };

    addTheme(project, context, entity);
};
