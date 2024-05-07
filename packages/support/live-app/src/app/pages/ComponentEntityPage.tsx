import { getResourceDiagnostics } from '@noodles-ui/core-diagnostics';
import { getComponentByKey } from '@noodles-ui/core-entities';
import { isComponentImportResource } from '@noodles-ui/core-resources';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ENTITY_TYPE_ICONS } from '../components/entities/ENTITY_TYPE_ICONS';
import { ComponentImport } from '../components/entities/component/ComponentImport/ComponentImport';
import { ComponentMixins } from '../components/entities/component/ComponentMixins/ComponentMixins';
import { ComponentParts } from '../components/entities/component/ComponentParts/ComponentParts';
import { ComponentProps } from '../components/entities/component/ComponentProps/ComponentProps';
import { ComponentRenderer } from '../components/entities/component/ComponentRenderer/ComponentRenderer';
import { EntityPageLayout } from '../components/layouts/EntityPageLayout';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { EntityDiagnostics } from '../components/molecules/EntityDiagnostics/EntityDiagnostics';
import { EntityReferences } from '../components/molecules/EntityReferences/EntityReferences';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ComponentEntityPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();
    const params = useParams();

    const component = () => getComponentByKey(lastSnapshot(), params.key);
    const entity = () => component().entity;

    const diagnostics = () => getResourceDiagnostics(entity(), lastSnapshot()?.diagnostics);
    const showRenderer = () => component().context.public && !isComponentImportResource(entity());
    const showImport = () => isComponentImportResource(entity());

    return (
        <Show when={lastSnapshot()}>
            <EntityPageLayout>
                <PageCrumbs project={lastSnapshot()?.project} entity={entity()} />
                <PageLayout>
                    <PageHeader>
                        <PageTitle>
                            <Icon icon={ENTITY_TYPE_ICONS.component} />
                            {entity().name}
                        </PageTitle>
                    </PageHeader>
                    <EntityDiagnostics diagnostics={diagnostics()} />
                    <Show when={showImport()}>
                        <SectionLayout>
                            <SectionTitle>Import</SectionTitle>
                            <ComponentImport component={component()} />
                        </SectionLayout>
                        <SectionLayout>
                            <SectionTitle>Parts</SectionTitle>
                            <ComponentParts component={component()} />
                        </SectionLayout>
                    </Show>
                    <Show when={showRenderer()}>
                        <ComponentRenderer component={component()} />
                    </Show>
                    <ComponentMixins component={component()} />
                    <ComponentProps component={component()} />
                    <EntityReferences item={component()} key="consumers" />
                    <EntityReferences item={component()} key="consumes" />
                </PageLayout>
            </EntityPageLayout>
        </Show>
    );
};
