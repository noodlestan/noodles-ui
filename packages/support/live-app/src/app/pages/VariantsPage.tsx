import { VariantBuildContext } from '@noodles-ui/support-types';
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
import { variants } from '../providers/SnapshotContextProvider/variants';

export const VariantsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const isPublicVariant = (variant: VariantBuildContext) => !!variant.context.public;

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>
                        {lastSnapshot()?.entities.project.get('')?.entity.module || '?'}
                    </ModuleName>
                    <PageTitle>Variants</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <SectionTitle>Variants</SectionTitle>
                    <CardGrid>
                        <For each={variants(lastSnapshot()).filter(isPublicVariant)}>
                            {variant => <VariantCard variant={variant} />}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
