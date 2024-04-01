import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { VariantBuildContext, getVariants } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { VariantCard } from '../components/entities/variant/VariantCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const VariantsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const isPublicVariant = (variant: VariantBuildContext) => !!variant.context.public;

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                    <PageTitle>Variants</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <SectionTitle>Variants</SectionTitle>
                    <CardGrid>
                        <For each={getVariants(lastSnapshot()).filter(isPublicVariant)}>
                            {variant => (
                                <VariantCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    variant={variant}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
