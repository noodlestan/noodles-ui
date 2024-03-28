// import { Heading, Text } from '@noodles-ui/lab-ui';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SurfaceCard } from '../components/entities/surface/SurfaceCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { surfaces } from '../providers/BuildContextProvider/surfaces';

export const SurfacesPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
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
    );
};
