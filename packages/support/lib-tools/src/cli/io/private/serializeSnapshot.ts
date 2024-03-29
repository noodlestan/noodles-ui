import {
    BuildSnapshotDto,
    ComponentBuildContext,
    ComponentBuildContextDto,
    MixinBuildContext,
    MixinBuildContextDto,
    ProjectContext,
    SurfaceBuildContext,
    SurfaceBuildContextDto,
    ThemeBuildContext,
    ThemeBuildContextDto,
    TokenBuildContext,
    TokenBuildContextDto,
    UnknownBuildContext,
    UnknownBuildContextDto,
    VariantBuildContext,
    VariantBuildContextDto,
    getDiagnosticErrors,
} from '@noodles-ui/support-types';

function mapToObject<T, V>(map: Map<string, T>, transform: (t: T) => V): { [key: string]: V } {
    const init = {} as { [key: string]: V };
    return Array.from(map.keys()).reduce((acc, key) => {
        acc[key] = transform(map.get(key) as T);
        return acc;
    }, init);
}

function transform<T extends UnknownBuildContext, V extends UnknownBuildContextDto>(item: T): V {
    const { context, entity } = item;
    const { consumes, consumers, ...rest } = context;
    return {
        context: {
            consumes: Array.from(consumes.values()),
            consumers: Array.from(consumers.values()),
            ...rest,
        },
        entity,
    } as V;
}

export const serializeSnapshot = (project: ProjectContext): BuildSnapshotDto => {
    const { surface, mixin, variant, component, token, theme } = project.entities;
    const data = {
        project: {
            name: project.resource?.name || '<unknown>',
            module: project.resource?.module || '<unknown>',
        },
        success: !!project.build.success && getDiagnosticErrors(project.diagnostics).length === 0,
        timestamp: new Date().toJSON(),
        entities: {
            surface: mapToObject<SurfaceBuildContext, SurfaceBuildContextDto>(surface, transform),
            mixin: mapToObject<MixinBuildContext, MixinBuildContextDto>(mixin, transform),
            variant: mapToObject<VariantBuildContext, VariantBuildContextDto>(variant, transform),
            component: mapToObject<ComponentBuildContext, ComponentBuildContextDto>(
                component,
                transform,
            ),
            theme: mapToObject<ThemeBuildContext, ThemeBuildContextDto>(theme, transform),
            token: mapToObject<TokenBuildContext, TokenBuildContextDto>(token, transform),
        },
        diagnostics: project.diagnostics,
    };
    return data;
};
