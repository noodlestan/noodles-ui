import {
    ComponentEntity,
    MixinResource,
    ProjectResource,
    SurfaceResource,
    ThemeEntity,
    TokenEntity,
    UnknownEntity,
    VariantEntity,
} from '@noodles-ui/core-types';

import { ResourceContext } from './context';
import { ProjectDiagnostic } from './diagnostics';
import {
    ComponentContext,
    EntityBuildContext,
    MixinContext,
    ProjectContext,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from './entities';
import { UnknownResource } from './resources';

export type ResourceContextDto<T> = Omit<ResourceContext<T>, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type UnknownBuildContextDto = EntityBuildContext<
    ResourceContextDto<UnknownResource>,
    UnknownEntity
>;

export type EntityContextDto<T extends ResourceContext<UnknownResource>> = Omit<
    T,
    'consumes' | 'consumers'
> & {
    consumes: string[];
    consumers: string[];
};

export type ProjectContextDto = EntityContextDto<ProjectContext>;
export type ProjectBuildContextDto = EntityBuildContext<ProjectContextDto, ProjectResource>;

export type SurfaceContextDto = EntityContextDto<SurfaceContext>;
export type SurfaceBuildContextDto = EntityBuildContext<SurfaceContextDto, SurfaceResource>;

export type MixinContextDto = EntityContextDto<MixinContext>;
export type MixinBuildContextDto = EntityBuildContext<MixinContextDto, MixinResource>;

export type VariantContextDto = EntityContextDto<VariantContext>;
export type VariantBuildContextDto = EntityBuildContext<VariantContextDto, VariantEntity>;

export type ComponentContextDto = EntityContextDto<ComponentContext>;
export type ComponentBuildContextDto = EntityBuildContext<ComponentContextDto, ComponentEntity>;

export type TokenContextDto = EntityContextDto<TokenContext>;
export type TokenBuildContextDto = EntityBuildContext<TokenContextDto, TokenEntity>;

export type ThemeContextDto = EntityContextDto<ThemeContext>;
export type ThemeBuildContextDto = EntityBuildContext<ThemeContextDto, ThemeEntity>;

export type EntityBuildMapDto<
    T extends EntityBuildContext<ResourceContextDto<UnknownResource>, UnknownResource>,
> = { [key: string]: T };

export type EntitiesMapDto = {
    project: EntityBuildMapDto<ProjectBuildContextDto>;
    surface: EntityBuildMapDto<SurfaceBuildContextDto>;
    mixin: EntityBuildMapDto<MixinBuildContextDto>;
    variant: EntityBuildMapDto<VariantBuildContextDto>;
    component: EntityBuildMapDto<ComponentBuildContextDto>;
    token: EntityBuildMapDto<TokenBuildContextDto>;
    theme: EntityBuildMapDto<ThemeBuildContextDto>;
};

export type BuildSnapshotDto = {
    success: boolean;
    timestamp: string;
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
