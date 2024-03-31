import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { MixinCard } from '../components/entities/mixin/MixinCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';
import { mixins } from '../providers/SnapshotContextProvider/mixins';

export const MixinsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>
                        {lastSnapshot()?.entities.project.get('')?.entity.module || '?'}
                    </ModuleName>
                    <PageTitle>Mixins</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <CardGrid>
                        <For each={mixins(lastSnapshot())}>
                            {mixin => <MixinCard mixin={mixin} />}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
