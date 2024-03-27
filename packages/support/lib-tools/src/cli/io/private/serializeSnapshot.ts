import {
    BuildSnapshotDto,
    ComponentBuildContext,
    ProjectContext,
    SurfaceBuildContext,
    ThemeBuildContext,
    TokenBuildContext,
    VariantBuildContext,
} from '@noodles-ui/support-types';

import { getProjectErrors } from '../../../project/getters/getProjectErrors';

function mapToObject<T>(map: Map<string, T>): { [key: string]: T } {
    return Object.fromEntries(map);
}

export const serializeSnapshot = (project: ProjectContext): BuildSnapshotDto => {
    const { surface, theme, component, variant, token } = project.entities;
    const data = {
        project: {
            name: project.resource?.name || '<unknown>',
            module: project.resource?.module || '<unknown>',
        },
        success: !!project.build.success && getProjectErrors(project).length === 0,
        timestamp: new Date().toJSON(),
        entities: {
            surface: mapToObject<SurfaceBuildContext>(surface),
            theme: mapToObject<ThemeBuildContext>(theme),
            component: mapToObject<ComponentBuildContext>(component),
            variant: mapToObject<VariantBuildContext>(variant),
            token: mapToObject<TokenBuildContext>(token),
        },
        diagnostics: project.diagnostics,
    };
    return data;
};
