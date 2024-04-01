import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getSurfaces } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SurfaceCard } from '../components/entities/surface/SurfaceCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SurfacesPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                    <PageTitle>Surfaces</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <CardGrid>
                        <For each={getSurfaces(lastSnapshot())}>
                            {surface => (
                                <SurfaceCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    surface={surface}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
