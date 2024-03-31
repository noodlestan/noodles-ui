import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SurfaceCard } from '../components/entities/surface/SurfaceCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';
import { surfaces } from '../providers/SnapshotContextProvider/surfaces';

export const SurfacesPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>
                        {lastSnapshot()?.entities.project.get('')?.entity.module || '?'}
                    </ModuleName>
                    <PageTitle>Surfaces</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <CardGrid>
                        <For each={surfaces(lastSnapshot())}>
                            {surface => <SurfaceCard surface={surface} />}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
