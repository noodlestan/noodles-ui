import { getItemDiagnostics, getResourceTypedKey } from '@noodles-ui/support-types';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { useBuildContext } from '../providers/BuildContextProvider';
import { surfaceByKey } from '../providers/BuildContextProvider/surfaceByKey';

export const SurfaceEntityPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const surface = () => surfaceByKey(lastSnapshot(), params.key);
    const entity = () => surface().entity;

    const diagnostics = () =>
        getItemDiagnostics(getResourceTypedKey(entity()), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Surface: {entity().name}</PageTitle>
                </PageHeader>
                <EntityDiagnostics diagnostics={diagnostics()} />

                <EntityReferences item={surface()} key="consumers" />
                <EntityReferences item={surface()} key="consumes" />
            </PageLayout>
        </Show>
    );
};
