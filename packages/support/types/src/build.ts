import {
    ComponentEntity,
    ProjectOwnResource,
    SurfaceResource,
    ThemeEntity,
    TokenEntity,
    VariantEntity,
} from '@noodles-ui/core-types';

import { ResourceContext } from './context';
import {
    ComponentContext,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from './entities';
import { ProjectDiagnostic } from './projects';
import { UnknownResource } from './resources';

export type EntityMapDto<T extends ResourceContext<UnknownResource>, V extends UnknownResource> = {
    [key: string]: {
        context: T;
        entity: V;
    };
};

type EntitiesMapDto = {
    surface: EntityMapDto<SurfaceContext, SurfaceResource>;
    theme: EntityMapDto<ThemeContext, ThemeEntity>;
    component: EntityMapDto<ComponentContext, ComponentEntity>;
    variant: EntityMapDto<VariantContext, VariantEntity>;
    token: EntityMapDto<TokenContext, TokenEntity>;
};

export type BuildSnapshotDto = {
    success: boolean;
    timestamp: string;
    project: Omit<ProjectOwnResource, 'type'>;
    entities: EntitiesMapDto;
    diagnostics: ProjectDiagnostic[];
};
