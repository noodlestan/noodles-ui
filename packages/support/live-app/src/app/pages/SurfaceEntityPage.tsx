import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getSurfaceByKey } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ENTITY_TYPE_ICONS } from '../components/entities/ENTITY_TYPE_ICONS';
import { SurfaceRenderer } from '../components/entities/surface/SurfaceRenderer/SurfaceRenderer';
import { EntityPageLayout } from '../components/layouts/EntityPageLayout';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const SurfaceEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const surface = () => getSurfaceByKey(lastSnapshot(), params.key);
    const entity = () => surface().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <EntityPageLayout>
                <PageCrumbs project={lastSnapshot()?.project} entity={entity()} />
                <PageLayout>
                    <PageHeader>
                        <PageTitle>
                            <Icon icon={ENTITY_TYPE_ICONS.surface} />
                            {entity().name}
                        </PageTitle>
                    </PageHeader>
                    <EntityDiagnostics diagnostics={diagnostics()} />
                    <SurfaceRenderer surface={surface()} />
                    <EntityReferences item={surface()} key="consumers" />
                    <EntityReferences item={surface()} key="consumes" />
                </PageLayout>
            </EntityPageLayout>
        </Show>
    );
};
