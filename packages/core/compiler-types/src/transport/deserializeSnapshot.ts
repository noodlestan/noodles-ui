import {
    ComponentBuildContext,
    MixinBuildContext,
    ProjectBuildContext,
    SurfaceBuildContext,
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
    ProjectBuildContextDto,
    SurfaceBuildContextDto,
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
    const { entities, diagnostics, timestamp, success } = snapshotDto;
    const { project, surface, mixin, variant, component, token, theme } = entities;

    const entityMaps = {
        project: toMap<ProjectBuildContext, ProjectBuildContextDto>(project, transform),
        surface: toMap<SurfaceBuildContext, SurfaceBuildContextDto>(surface, transform),
        mixin: toMap<MixinBuildContext, MixinBuildContextDto>(mixin, transform),
        variant: toMap<VariantBuildContext, VariantBuildContextDto>(variant, transform),
        token: toMap<TokenBuildContext, TokenBuildContextDto>(token, transform),
        component: toMap<ComponentBuildContext, ComponentBuildContextDto>(component, transform),
        theme: toMap<ThemeBuildContext, ThemeBuildContextDto>(theme, transform),
    };

    return { entities: entityMaps, diagnostics, timestamp: new Date(timestamp), success };
};
