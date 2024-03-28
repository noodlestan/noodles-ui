import {
    ComponentEntity,
    MixinResource,
    ProjectOwnResource,
    SurfaceResource,
    ThemeEntity,
    TokenEntity,
    VariantEntity,
} from '@noodles-ui/core-types';

import { ResourceContext } from './context';
import { ProjectDiagnostic } from './diagnostics';
import {
    ComponentContext,
    MixinContext,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from './entities';
import { UnknownResource } from './resources';

export type EntityMapDto<T extends ResourceContext<UnknownResource>, V extends UnknownResource> = {
    [key: string]: {
        context: T;
        entity: V;
    };
};

export type EntitiesMapDto = {
    surface: EntityMapDto<SurfaceContext, SurfaceResource>;
    mixin: EntityMapDto<MixinContext, MixinResource>;
    variant: EntityMapDto<VariantContext, VariantEntity>;
    component: EntityMapDto<ComponentContext, ComponentEntity>;
    token: EntityMapDto<TokenContext, TokenEntity>;
    theme: EntityMapDto<ThemeContext, ThemeEntity>;
};

export type BuildSnapshotDto = {
    success: boolean;
    timestamp: string;
    project: Omit<ProjectOwnResource, 'type'>;
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
