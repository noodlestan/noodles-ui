import { ProjectDiagnostic } from '@noodles-ui/core-diagnostics';
import {
    ComponentContext,
    ComponentEntity,
    EntityBuildContext,
    MixinContext,
    MixinEntity,
    ProjectEntity,
    SurfaceContext,
    SurfaceEntity,
    SystemContext,
    SystemEntity,
    ThemeContext,
    ThemeEntity,
    TokenContext,
    TokenEntity,
    UnknownEntity,
    VariantContext,
    VariantEntity,
} from '@noodles-ui/core-entities';
import { ResourceContext, UnknownResource } from '@noodles-ui/core-resources';

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

export type SystemContextDto = EntityContextDto<SystemContext>;
export type SystemBuildContextDto = EntityBuildContext<SystemContextDto, SystemEntity>;

export type SurfaceContextDto = EntityContextDto<SurfaceContext>;
export type SurfaceBuildContextDto = EntityBuildContext<SurfaceContextDto, SurfaceEntity>;

export type MixinContextDto = EntityContextDto<MixinContext>;
export type MixinBuildContextDto = EntityBuildContext<MixinContextDto, MixinEntity>;

export type VariantContextDto = EntityContextDto<VariantContext>;
export type VariantBuildContextDto = EntityBuildContext<VariantContextDto, VariantEntity>;

export type ComponentContextDto = EntityContextDto<ComponentContext>;
export type ComponentBuildContextDto = EntityBuildContext<ComponentContextDto, ComponentEntity>;

export type TokenContextDto = EntityContextDto<TokenContext>;
export type TokenBuildContextDto = EntityBuildContext<TokenContextDto, TokenEntity>;

export type ThemeContextDto = EntityContextDto<ThemeContext>;
export type ThemeBuildContextDto = EntityBuildContext<ThemeContextDto, ThemeEntity>;

export type EntityBuildMapDto<
    T extends EntityBuildContext<ResourceContextDto<UnknownResource>, UnknownEntity>,
> = { [key: string]: T };

export type BuildSnapshotAttributesDto = {
    project: ProjectEntity;
    success: boolean;
    timestamp: string;
    dependencies: string[];
};

// export type EntitiesMapDto = Record<EntityType, EntityBuildMapDto<UnknownBuildContextDto>>;
export type EntitiesMapDto = {
    system: EntityBuildMapDto<SystemBuildContextDto>;
    surface: EntityBuildMapDto<SurfaceBuildContextDto>;
    mixin: EntityBuildMapDto<MixinBuildContextDto>;
    variant: EntityBuildMapDto<VariantBuildContextDto>;
    component: EntityBuildMapDto<ComponentBuildContextDto>;
    token: EntityBuildMapDto<TokenBuildContextDto>;
    theme: EntityBuildMapDto<ThemeBuildContextDto>;
};

export type BuildSnapshotDto = BuildSnapshotAttributesDto & {
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
