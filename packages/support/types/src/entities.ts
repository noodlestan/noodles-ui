import {
    ComponentEntity,
    ComponentResource,
    MixinResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantEntity,
    VariantResource,
} from '@noodles-ui/core-types';

import { ResourceContext } from './context';
import { UnknownResource } from './resources';

export type EntityBuildContext<T, V> = {
    context: T;
    entity: V;
};

export type UnknownBuildContext = EntityBuildContext<
    ResourceContext<UnknownResource>,
    UnknownResource
>;

export type EntityBuildMap<
    T extends EntityBuildContext<ResourceContext<UnknownResource>, UnknownResource>,
> = Map<string, T>;

export type SurfaceContext = ResourceContext<SurfaceResource>;
export type SurfaceBuildContext = EntityBuildContext<SurfaceContext, SurfaceResource>;
export type SurfaceEntityMap = EntityBuildMap<SurfaceBuildContext>;

export type ThemeContext = ResourceContext<ThemeResource>;
export type ThemeBuildContext = EntityBuildContext<ThemeContext, ThemeResource>;
export type ThemeEntityMap = EntityBuildMap<ThemeBuildContext>;

export type VariantContext = ResourceContext<VariantResource>;
export type VariantBuildContext = EntityBuildContext<VariantContext, VariantEntity>;
export type VariantEntityMap = EntityBuildMap<VariantBuildContext>;

export type ComponentContext = ResourceContext<ComponentResource>;
export type ComponentBuildContext = EntityBuildContext<ComponentContext, ComponentEntity>;
export type ComponentEntityMap = EntityBuildMap<ComponentBuildContext>;

export type TokenContext = ResourceContext<TokenResource>;
export type TokenBuildContext = EntityBuildContext<TokenContext, TokenResource>;
export type TokenEntityMap = EntityBuildMap<TokenBuildContext>;

export type MixinContext = ResourceContext<MixinResource>;
export type MixinBuildContext = EntityBuildContext<MixinContext, MixinResource>;
export type MixinEntityMap = EntityBuildMap<MixinBuildContext>;
