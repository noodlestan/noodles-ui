import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { SurfaceBuildContext, getSurfaces } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SurfaceCardRow } from '../components/entities/surface/SurfaceCardRow';
import { ListLayout } from '../components/layouts/ListLayout';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SurfacesPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const diagnostics = () => getDiagnosticByResourceType('surface', lastSnapshot()?.diagnostics);

    const params = useParams();
    const module = () => params.module;

    const isPublic = (surface: SurfaceBuildContext) => !!surface.context.public;
    const surfaces = () =>
        getSurfaces(lastSnapshot()).filter(surface => {
            const mod = module();
            return isPublic(surface) && (!mod || surface.entity.module === mod);
        });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Surfaces</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <ListLayout>
                        <For each={surfaces()}>
                            {surface => (
                                <SurfaceCardRow
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    surface={surface}
                                />
                            )}
                        </For>
                    </ListLayout>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
