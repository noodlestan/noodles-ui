import {
    ComponentBuildContext,
    EntityBuildMap,
    MixinBuildContext,
    ProjectBuildContext,
    SurfaceBuildContext,
    ThemeBuildContext,
    TokenBuildContext,
    UnknownBuildContext,
    VariantBuildContext,
} from '@noodles-ui/core-entities';

import { BuildSnapshot } from '../snapshot';

import {
    BuildSnapshotDto,
    ComponentBuildContextDto,
    MixinBuildContextDto,
    ProjectBuildContextDto,
    SurfaceBuildContextDto,
    ThemeBuildContextDto,
    TokenBuildContextDto,
    UnknownBuildContextDto,
    VariantBuildContextDto,
} from './types';

function mapToObject<T extends UnknownBuildContext, V>(
    map: EntityBuildMap<T>,
    transform: (t: T) => V,
): { [key: string]: V } {
    const init = {} as { [key: string]: V };
    return Array.from(map.keys()).reduce((acc, key) => {
        acc[key] = transform(map.get(key) as T);
        return acc;
    }, init);
}

function transform<T extends UnknownBuildContext, V extends UnknownBuildContextDto>(item: T): V {
    const { context, entity } = item;
    const { consumes, consumers, ...rest } = context;
    return {
        context: {
            consumes: Array.from(consumes.values()),
            consumers: Array.from(consumers.values()),
            ...rest,
        },
        entity,
    } as V;
}

export const serializeSnapshot = (snapshot: BuildSnapshot): BuildSnapshotDto => {
    const { success, timestamp, entities } = snapshot;
    const { project, surface, mixin, variant, component, token, theme } = entities;
    const data = {
        success,
        timestamp: timestamp.toJSON(),
        entities: {
            project: mapToObject<ProjectBuildContext, ProjectBuildContextDto>(project, transform),
            surface: mapToObject<SurfaceBuildContext, SurfaceBuildContextDto>(surface, transform),
            mixin: mapToObject<MixinBuildContext, MixinBuildContextDto>(mixin, transform),
            variant: mapToObject<VariantBuildContext, VariantBuildContextDto>(variant, transform),
            component: mapToObject<ComponentBuildContext, ComponentBuildContextDto>(
                component,
                transform,
            ),
            theme: mapToObject<ThemeBuildContext, ThemeBuildContextDto>(theme, transform),
            token: mapToObject<TokenBuildContext, TokenBuildContextDto>(token, transform),
        },
        diagnostics: snapshot.diagnostics,
    };
    return data;
};
