import {
    BuildSnapshotDto,
    ComponentContext,
    ComponentContextWithInstance,
    ProjectContext,
    SurfaceContext,
    SurfaceContextWithInstance,
    ThemeContext,
    ThemeContextWithInstance,
    TokenContext,
    TokenContextWithInstance,
    VariantContext,
    VariantContextWithInstance,
} from '@noodles-ui/support-types';

function mapToObject<T, V extends T>(map: Map<string, T>): { [key: string]: V } {
    return Object.fromEntries(map) as { [key: string]: V };
}

export const serializeSnapshot = (project: ProjectContext): BuildSnapshotDto => {
    const { surface, theme, component, variant, token } = project.entities;
    const data = {
        project: {
            name: project.resource?.name || '<unknown>',
            module: project.resource?.module || '<unknown>',
        },
        success: !project.diagnostics.length,
        timestamp: new Date().toJSON(),
        entities: {
            surface: mapToObject<SurfaceContext, SurfaceContextWithInstance>(surface),
            theme: mapToObject<ThemeContext, ThemeContextWithInstance>(theme),
            component: mapToObject<ComponentContext, ComponentContextWithInstance>(component),
            variant: mapToObject<VariantContext, VariantContextWithInstance>(variant),
            token: mapToObject<TokenContext, TokenContextWithInstance>(token),
        },
        diagnostics: [],
    };
    return data;
};
