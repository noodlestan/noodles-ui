import { getItemDiagnostics } from '@noodles-ui/core-diagnostics';
import { getSurfaceByKey } from '@noodles-ui/core-entities';
import { getResourceTypedKey } from '@noodles-ui/core-resources';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SurfaceEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const surface = () => getSurfaceByKey(lastSnapshot(), params.key);
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
