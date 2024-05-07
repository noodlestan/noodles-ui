import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getSystem, getSystemComponentName } from '@noodles-ui/core-entities';
import { Component, Show } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ENTITY_TYPE_ICONS } from '../components/entities/ENTITY_TYPE_ICONS';
import { EntityPageLayout } from '../components/layouts/EntityPageLayout';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { SystemMixins } from '../components/molecules/SystemMixins/SystemMixins';
import { SystemSurface } from '../components/molecules/SystemSurface/SystemSurface';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SystemEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const system = () => getSystem(lastSnapshot());
    const entity = () => system().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <EntityPageLayout>
                <PageCrumbs project={lastSnapshot()?.project} entity={entity()} />
                <PageLayout>
                    <PageHeader>
                        <PageTitle>
                            <Icon icon={ENTITY_TYPE_ICONS.system} />
                            {getSystemComponentName(lastSnapshot() as BuildSnapshot)}
                        </PageTitle>
                    </PageHeader>
                    <EntityDiagnostics diagnostics={diagnostics()} />
                    <SystemSurface snapshot={lastSnapshot()} system={system()} />
                    <SystemMixins system={system()} />
                    <EntityReferences item={system()} key="consumers" />
                    <EntityReferences item={system()} key="consumes" />
                </PageLayout>
            </EntityPageLayout>
        </Show>
    );
};
