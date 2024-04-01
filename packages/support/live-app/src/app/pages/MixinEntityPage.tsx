import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getMixinByKey } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const MixinEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const mixin = () => getMixinByKey(lastSnapshot(), params.key);
    const entity = () => mixin().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Mixin: {entity().name}</PageTitle>
                </PageHeader>
                <EntityDiagnostics diagnostics={diagnostics()} />

                <EntityReferences item={mixin()} key="consumers" />
                <EntityReferences item={mixin()} key="consumes" />
            </PageLayout>
        </Show>
    );
};
