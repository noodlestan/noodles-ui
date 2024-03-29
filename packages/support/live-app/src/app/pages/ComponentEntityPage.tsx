import { getItemDiagnostics, getResourceTypedKey } from '@noodles-ui/support-types';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { ComponentProps } from '../components/molecules/ComponentProps/ComponentProps';
import { ComponentRenderer } from '../components/molecules/ComponentRenderer/ComponentRenderer';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { useBuildContext } from '../providers/BuildContextProvider';
import { componentByKey } from '../providers/BuildContextProvider/componentByKey';

export const ComponentEntityPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const component = () => componentByKey(lastSnapshot(), params.key);
    const entity = () => component().entity;

    const diagnostics = () =>
        getItemDiagnostics(getResourceTypedKey(entity()), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Component: {entity().name}</PageTitle>
                </PageHeader>
                <EntityDiagnostics diagnostics={diagnostics()} />
                <Show when={component().context.public}>
                    <ComponentRenderer component={component()} />
                </Show>
                <ComponentProps component={component()} />
                <EntityReferences item={component()} key="consumers" />
                <EntityReferences item={component()} key="consumes" />
            </PageLayout>
        </Show>
    );
};
