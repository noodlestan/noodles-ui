// import { Heading, Text } from '@noodles-ui/lab-ui';
import { ComponentBuildContext } from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ComponentCard } from '../components/entities/component/ComponentCard/ComponentCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { components } from '../providers/BuildContextProvider/components';

export const ComponentsPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const isPublicComponent = (component: ComponentBuildContext) => !!component.context.public;

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                <PageTitle>Components</PageTitle>
            </PageHeader>
            <SectionLayout>
                <CardGrid>
                    <For each={components(lastSnapshot()).filter(isPublicComponent)}>
                        {component => <ComponentCard component={component} />}
                    </For>
                </CardGrid>
            </SectionLayout>
        </StageLayout>
    );
};
