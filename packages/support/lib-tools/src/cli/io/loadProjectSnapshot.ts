import {
    ComponentBuildContext,
    ComponentBuildContextDto,
    MixinBuildContext,
    MixinBuildContextDto,
    ProjectContext,
    SurfaceBuildContext,
    SurfaceBuildContextDto,
    ThemeBuildContext,
    ThemeBuildContextDto,
    TokenBuildContext,
    TokenBuildContextDto,
    UnknownBuildContext,
    UnknownBuildContextDto,
    VariantBuildContext,
    VariantBuildContextDto,
} from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { loadProjectSnapshotFile } from './private/loadProjectSnapshotFile';

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

export const loadProjectSnapshot = async (project: ProjectContext): Promise<void> => {
    const snapshotDto = await loadProjectSnapshotFile(project);
    const { surface, mixin, variant, component, token, theme } = snapshotDto.entities;

    const entities = {
        surface: toMap<SurfaceBuildContext, SurfaceBuildContextDto>(surface, transform),
        mixin: toMap<MixinBuildContext, MixinBuildContextDto>(mixin, transform),
        variant: toMap<VariantBuildContext, VariantBuildContextDto>(variant, transform),
        token: toMap<TokenBuildContext, TokenBuildContextDto>(token, transform),
        component: toMap<ComponentBuildContext, ComponentBuildContextDto>(component, transform),
        theme: toMap<ThemeBuildContext, ThemeBuildContextDto>(theme, transform),
    };

    project.entities = entities;

    const fileName = getProjectSnapshotFileName(project);
    logSuccess('Loaded project snapshot', formatFileNameRelativeToProject(project, fileName, true));
};
