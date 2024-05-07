import { getAllDiagnosticSourceKeys } from '@noodles-ui/core-diagnostics';
import { TriangleAlertIcon } from 'lucide-solid';
import { Component, For, Show } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ListLayout } from '../components/layouts/ListLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticSourceItem } from '../components/molecules/DiagnosticSourceItem/DiagnosticSourceItem';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const DiagnosticsPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const sourcesWithIssues = () => getAllDiagnosticSourceKeys(lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={undefined} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>
                        <Icon icon={TriangleAlertIcon} />
                        Diagnostics
                    </PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={lastSnapshot()?.diagnostics} noLink />
                <ListLayout tag="ul">
                    <SectionTitle>Items with issues</SectionTitle>
                    <For each={sourcesWithIssues()}>
                        {sourceKey => (
                            <DiagnosticSourceItem sourceKey={sourceKey} snapshot={lastSnapshot()} />
                        )}
                    </For>
                </ListLayout>
            </StageLayout>
        </Show>
    );
};
