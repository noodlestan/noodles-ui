import {
    ComponentEntity,
    MixinResource,
    ProjectOwnResource,
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

export type SurfaceContextDto = Omit<SurfaceContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type MixinContextDto = Omit<MixinContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type VariantContextDto = Omit<VariantContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type ComponentContextDto = Omit<ComponentContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type TokenContextDto = Omit<TokenContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type ThemeContextDto = Omit<ThemeContext, 'consumes' | 'consumers'> & {
    consumes: string[];
    consumers: string[];
};

export type SurfaceBuildContextDto = EntityBuildContext<SurfaceContextDto, SurfaceResource>;
export type MixinBuildContextDto = EntityBuildContext<MixinContextDto, MixinResource>;
export type VariantBuildContextDto = EntityBuildContext<VariantContextDto, VariantEntity>;
export type ComponentBuildContextDto = EntityBuildContext<ComponentContextDto, ComponentEntity>;
export type TokenBuildContextDto = EntityBuildContext<TokenContextDto, TokenEntity>;
export type ThemeBuildContextDto = EntityBuildContext<ThemeContextDto, ThemeEntity>;

export type EntityBuildMapDto<
    T extends EntityBuildContext<ResourceContextDto<UnknownResource>, UnknownResource>,
> = { [key: string]: T };

export type EntitiesMapDto = {
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
    project: Omit<ProjectOwnResource, 'type'>;
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
