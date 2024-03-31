import { VariantEntity } from '@noodles-ui/core-types';
import { getItemDiagnostics, getResourceTypedKey } from '@noodles-ui/support-types';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';
import { variantByKey } from '../providers/SnapshotContextProvider/variantByKey';

export const VariantEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const variant = () => variantByKey(lastSnapshot(), params.key);
    const entity = () => variant().entity as VariantEntity;

    const diagnostics = () =>
        getItemDiagnostics(getResourceTypedKey(entity()), lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Variant: {entity().name}</PageTitle>
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
        </Show>
    );
};
