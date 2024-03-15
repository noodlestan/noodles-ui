import {
    ComponentEntity,
    ProjectOwnResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantEntity,
} from '@noodles-ui/core-types';

import {
    ComponentContext,
    ProjectDiagnostic,
    ResourceContext,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from './projects';
import { UnknownResource } from './resources';

export type EntityMapDto<T extends ResourceContext<UnknownResource>, V extends UnknownResource> = {
    [key: string]: {
        context: T;
        entity: V;
    };
};

type EntitiesMapDto = {
    surface: EntityMapDto<SurfaceContext, SurfaceResource>;
    theme: EntityMapDto<ThemeContext, ThemeResource>;
    component: EntityMapDto<ComponentContext, ComponentEntity>;
    variant: EntityMapDto<VariantContext, VariantEntity>;
    token: EntityMapDto<TokenContext, TokenResource>;
};

export type BuildSnapshotDto = {
    success: boolean;
    timestamp: string;
    project: Omit<ProjectOwnResource, 'type'>;
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
