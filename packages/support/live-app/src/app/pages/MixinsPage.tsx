// import { Heading, Text } from '@noodles-ui/lab-ui';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { MixinCard } from '../components/entities/mixin/MixinCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { mixins } from '../providers/BuildContextProvider/mixins';

export const MixinsPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                <PageTitle>MixinsPage</PageTitle>
            </PageHeader>
            <SectionLayout>
                <CardGrid>
                    <For each={mixins(lastSnapshot())}>{mixin => <MixinCard mixin={mixin} />}</For>
                </CardGrid>
            </SectionLayout>
        </StageLayout>
    );
};
