import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getSurfaces } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SurfaceCardRow } from '../components/entities/surface/SurfaceCardRow';
import { ListLayout } from '../components/layouts/ListLayout';
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
                    <ListLayout>
                        <For each={getSurfaces(lastSnapshot())}>
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
