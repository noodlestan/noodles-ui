import {
    ComponentResource,
    MixinResource,
    ProjectResource,
    ResourceContext,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantResource,
} from '@noodles-ui/core-resources';

import { ComponentEntity } from '../component';
import { EntityBuildContext, EntityBuildMap } from '../context/types';
import { MixinEntity } from '../mixin';
import { ProjectEntity } from '../project/types';
import { SurfaceEntity } from '../surface';
import { ThemeEntity } from '../theme';
import { TokenEntity } from '../token';
import { VariantEntity } from '../variant';

export type ProjectContext = ResourceContext<ProjectResource>;
export type ProjectBuildContext = EntityBuildContext<ProjectContext, ProjectEntity>;
export type ProjectEntityMap = EntityBuildMap<ProjectBuildContext>;

export type SurfaceContext = ResourceContext<SurfaceResource>;
export type SurfaceBuildContext = EntityBuildContext<SurfaceContext, SurfaceEntity>;
export type SurfaceEntityMap = EntityBuildMap<SurfaceBuildContext>;

export type MixinContext = ResourceContext<MixinResource>;
export type MixinBuildContext = EntityBuildContext<MixinContext, MixinEntity>;
export type MixinEntityMap = EntityBuildMap<MixinBuildContext>;

export type VariantContext = ResourceContext<VariantResource>;
export type VariantBuildContext = EntityBuildContext<VariantContext, VariantEntity>;
export type VariantEntityMap = EntityBuildMap<VariantBuildContext>;

export type ComponentContext = ResourceContext<ComponentResource>;
export type ComponentBuildContext = EntityBuildContext<ComponentContext, ComponentEntity>;
export type ComponentEntityMap = EntityBuildMap<ComponentBuildContext>;

export type TokenContext = ResourceContext<TokenResource>;
export type TokenBuildContext = EntityBuildContext<TokenContext, TokenEntity>;
export type TokenEntityMap = EntityBuildMap<TokenBuildContext>;

export type ThemeContext = ResourceContext<ThemeResource>;
export type ThemeBuildContext = EntityBuildContext<ThemeContext, ThemeEntity>;
export type ThemeEntityMap = EntityBuildMap<ThemeBuildContext>;

// export type ProjectEntitiesMap = Record<EntityType, EntityBuildMap<UnknownBuildContext>>;
export type ProjectEntitiesMap = {
    project: ProjectEntityMap;
    surface: SurfaceEntityMap;
    mixin: MixinEntityMap;
    variant: VariantEntityMap;
    component: ComponentEntityMap;
    token: TokenEntityMap;
    theme: ThemeEntityMap;
};

export type ProjectEntities = {
    entities: ProjectEntitiesMap;
};
