import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { VariantBuildContext, getVariants } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { VariantCard } from '../components/entities/variant/VariantCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const VariantsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const diagnostics = () => getDiagnosticByResourceType('variant', lastSnapshot()?.diagnostics);
    const params = useParams();
    const module = () => params.module;

    const isPublic = (variant: VariantBuildContext) => variant.context.public;
    const variants = () =>
        getVariants(lastSnapshot()).filter(variant => {
            const mod = module();
            return isPublic(variant) && (!mod || variant.entity.module === mod);
        });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Variants</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <CardGrid>
                        <For each={variants()}>
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
