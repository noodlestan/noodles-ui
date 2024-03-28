import {
    BuildSnapshotDto,
    ComponentBuildContext,
    MixinBuildContext,
    ProjectContext,
    SurfaceBuildContext,
    ThemeBuildContext,
    TokenBuildContext,
    VariantBuildContext,
    getDiagnosticErrors,
} from '@noodles-ui/support-types';

function mapToObject<T>(map: Map<string, T>): { [key: string]: T } {
    return Object.fromEntries(map);
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
            surface: mapToObject<SurfaceBuildContext>(surface),
            mixin: mapToObject<MixinBuildContext>(mixin),
            variant: mapToObject<VariantBuildContext>(variant),
            component: mapToObject<ComponentBuildContext>(component),
            theme: mapToObject<ThemeBuildContext>(theme),
            token: mapToObject<TokenBuildContext>(token),
        },
        diagnostics: project.diagnostics,
    };
    return data;
};
