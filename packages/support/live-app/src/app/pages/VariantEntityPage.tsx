import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getVariantByKey } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ENTITY_TYPE_ICONS } from '../components/entities/ENTITY_TYPE_ICONS';
import { EntityPageLayout } from '../components/layouts/EntityPageLayout';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const VariantEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const variant = () => getVariantByKey(lastSnapshot(), params.key);
    const entity = () => variant().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <EntityPageLayout>
                <PageCrumbs project={lastSnapshot()?.project} entity={entity()} />
                <PageLayout>
                    <PageHeader>
                        <PageTitle>
                            <Icon icon={ENTITY_TYPE_ICONS.variant} />
                            {entity().name}
                        </PageTitle>
                    </PageHeader>
                    <EntityDiagnostics diagnostics={diagnostics()} />
                    <SectionLayout>
                        <SectionTitle>Options</SectionTitle>
                        <ul>
                            <For each={entity().options}>
                                {option => (
                                    <li>
                                        <h4>{option}</h4>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </SectionLayout>
                    <EntityReferences item={variant()} key="consumers" />
                    <EntityReferences item={variant()} key="consumes" />
                </PageLayout>
            </EntityPageLayout>
        </Show>
    );
};
