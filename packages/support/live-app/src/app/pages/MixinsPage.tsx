import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { MixinBuildContext, getMixins } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { MixinCard } from '../components/entities/mixin/MixinCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const MixinsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const diagnostics = () => getDiagnosticByResourceType('mixin', lastSnapshot()?.diagnostics);

    const params = useParams();
    const module = () => params.module;

    const isPublic = (mixin: MixinBuildContext) => !!mixin.context.public;
    const mixins = () =>
        getMixins(lastSnapshot()).filter(mixin => {
            const mod = module();
            return isPublic(mixin) && (!mod || mixin.entity.module === mod);
        });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Mixins</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <CardGrid>
                        <For each={mixins()}>
                            {mixin => (
                                <MixinCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    mixin={mixin}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
