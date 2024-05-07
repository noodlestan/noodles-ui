import {
    ComponentBuildContext,
    MixinBuildContext,
    SurfaceBuildContext,
    SystemBuildContext,
    ThemeBuildContext,
    TokenBuildContext,
    UnknownBuildContext,
    VariantBuildContext,
} from '@noodles-ui/core-entities';

import { BuildSnapshot } from '../snapshot/types';

import {
    BuildSnapshotDto,
    ComponentBuildContextDto,
    MixinBuildContextDto,
    SurfaceBuildContextDto,
    SystemBuildContextDto,
    ThemeBuildContextDto,
    TokenBuildContextDto,
    UnknownBuildContextDto,
    VariantBuildContextDto,
} from './types';

function toMap<T, V>(object: { [key: string]: V }, transform: (t: V) => T): Map<string, T> {
    const entries = Object.entries(object).map(entry => {
        const [key, value] = entry;
        return [key, transform(value)];
    }) as [string, T][];

    return new Map(entries);
}

function transform<T extends UnknownBuildContextDto, V extends UnknownBuildContext>(item: T): V {
    const { context, entity } = item;
    const { consumes, consumers, ...rest } = context;
    return {
        context: {
            consumes: new Set(consumes),
            consumers: new Set(consumers),
            ...rest,
        },
        entity,
    } as V;
}

export const deserializeSnapshot = (snapshotDto: BuildSnapshotDto): BuildSnapshot => {
    const { project, timestamp, success, entities, diagnostics, dependencies } = snapshotDto;
    const { system, surface, mixin, variant, component, token, theme } = entities;

    const entityMaps = {
        system: toMap<SystemBuildContext, SystemBuildContextDto>(system, transform),
        surface: toMap<SurfaceBuildContext, SurfaceBuildContextDto>(surface, transform),
        mixin: toMap<MixinBuildContext, MixinBuildContextDto>(mixin, transform),
        variant: toMap<VariantBuildContext, VariantBuildContextDto>(variant, transform),
        token: toMap<TokenBuildContext, TokenBuildContextDto>(token, transform),
        component: toMap<ComponentBuildContext, ComponentBuildContextDto>(component, transform),
        theme: toMap<ThemeBuildContext, ThemeBuildContextDto>(theme, transform),
    };

    return {
        project,
        timestamp: new Date(timestamp),
        success,
        entities: entityMaps,
        diagnostics,
        dependencies,
    };
};
