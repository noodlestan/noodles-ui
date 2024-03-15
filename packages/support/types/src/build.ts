import { ProjectOwnResource } from '@noodles-ui/core-types';

import {
    ComponentContextWithInstance,
    ProjectDiagnostic,
    SurfaceContextWithInstance,
    ThemeContextWithInstance,
    TokenContext,
    VariantContextWithInstance,
} from './projects';

export type BuildEntitiesMap = {
    surface: { [key: string]: SurfaceContextWithInstance };
    theme: { [key: string]: ThemeContextWithInstance };
    component: { [key: string]: ComponentContextWithInstance };
    variant: { [key: string]: VariantContextWithInstance };
    token: { [key: string]: TokenContext };
};

export type BuildSnapshotDto = {
    success: boolean;
    timestamp: string;
    project: Omit<ProjectOwnResource, 'type'>;
    entities: BuildEntitiesMap;
    diagnostics: ProjectDiagnostic[];
};
