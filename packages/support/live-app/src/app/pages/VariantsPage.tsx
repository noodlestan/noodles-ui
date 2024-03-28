// import { Heading, Text } from '@noodles-ui/lab-ui';
import { VariantBuildContext } from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { VariantCard } from '../components/entities/variant/VariantCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { variants } from '../providers/BuildContextProvider/variants';

export const VariantsPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const isPublicVariant = (variant: VariantBuildContext) => !!variant.context.public;

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
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
    );
};