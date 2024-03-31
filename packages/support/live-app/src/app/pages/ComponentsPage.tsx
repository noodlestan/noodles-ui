import { ComponentBuildContext, getComponents, getProject } from '@noodles-ui/support-types';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ComponentCard } from '../components/entities/component/ComponentCard/ComponentCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ComponentsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const isPublicComponent = (component: ComponentBuildContext) => !!component.context.public;

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{getProject(lastSnapshot()).entity.module || '?'}</ModuleName>
                    <PageTitle>Components</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <CardGrid>
                        <For each={getComponents(lastSnapshot()).filter(isPublicComponent)}>
                            {component => <ComponentCard component={component} />}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
