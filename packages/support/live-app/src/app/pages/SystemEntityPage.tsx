import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getSystem } from '@noodles-ui/core-entities';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { SystemMixins } from '../components/molecules/SystemMixins/SystemMixins';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SystemEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const system = () => getSystem(lastSnapshot());
    const entity = () => system().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>System Root: {entity().name}</PageTitle>
                </PageHeader>
                <EntityDiagnostics diagnostics={diagnostics()} />
                <SystemMixins system={system()} />
                <EntityReferences item={system()} key="consumers" />
                <EntityReferences item={system()} key="consumes" />
            </PageLayout>
        </Show>
    );
};
