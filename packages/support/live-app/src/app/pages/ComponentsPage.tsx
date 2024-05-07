import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { ComponentBuildContext, getComponents } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ComponentCard } from '../components/entities/component/ComponentCard/ComponentCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ComponentsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();
    const module = () => params.module;

    const filter = (component: ComponentBuildContext) =>
        (!!params.module || component.context.public) &&
        (!params.module || component.entity.module === params.module);
    const components = () => getComponents(lastSnapshot()).filter(filter);

    const diagnostics = () => getDiagnosticByResourceType('component', lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Components</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <CardGrid>
                        <For each={components()}>
                            {component => (
                                <ComponentCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    component={component}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
