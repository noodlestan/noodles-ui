import { SurfaceTokenMap, ThemeResource, ThemeTokens, TokenMap } from '@noodles-ui/core-types';
import { ProjectContext, SurfaceBuildContext, TokenBuildContext } from '@noodles-ui/support-types';

const pickTokens = (
    project: ProjectContext,
    theme: ThemeResource,
    tokens: TokenBuildContext[],
    tag: string,
    surface: boolean,
    tokenMap: TokenMap = {},
): TokenMap => {
    const items = tokens.filter(token => token.entity.surface === surface);

    const input = { ...tokenMap };

    const map = items.reduce((acc, token) => {
        const name = token.entity.name;
        if (name in tokenMap) {
            acc[name] = tokenMap[name];
            delete input[name];
        }
        return acc;
    }, {} as TokenMap);

    for (const name in input) {
        project.addWarning(theme, `Unknown token "${name}" in input "${tag}".`);
    }

    return map;
};

const pickSurfaceTokens = (
    project: ProjectContext,

    theme: ThemeResource,
    surfaces: SurfaceBuildContext[],
    tokens: TokenBuildContext[],
    themeTag: string,
    surfaceTokenMap: SurfaceTokenMap = {},
): SurfaceTokenMap => {
    const map = surfaces.reduce((acc, surface) => {
        const name = surface.entity.name;
        const tag = themeTag + '.' + name;
        acc[name] = pickTokens(project, theme, tokens, tag, true, surfaceTokenMap[name]);
        return acc;
    }, {} as SurfaceTokenMap);
    return map;
};

export const pickThemeTokens = (
    project: ProjectContext,
    theme: ThemeResource,
    tokens: TokenBuildContext[],
    inputTokens?: ThemeTokens,
): ThemeTokens => {
    const surfaces = Array.from(project.entities.surface.values());

    return {
        base: {
            global: pickTokens(
                project,
                theme,
                tokens,
                'base.global',
                false,
                inputTokens?.base.global,
            ),
            surfaces: pickSurfaceTokens(
                project,
                theme,
                surfaces,
                tokens,
                'base.surface',
                inputTokens?.base.surfaces,
            ),
        },
        alt: {
            global: pickTokens(
                project,
                theme,
                tokens,
                'alt.global',
                false,
                inputTokens?.alt.global,
            ),
            surfaces: pickSurfaceTokens(
                project,
                theme,
                surfaces,
                tokens,
                'alt.surface',
                inputTokens?.alt.surfaces,
            ),
        },
    };
};
