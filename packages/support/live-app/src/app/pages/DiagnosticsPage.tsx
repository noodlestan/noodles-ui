import { getAllDiagnosticSourceKeys } from '@noodles-ui/support-types';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ListLayout } from '../components/layouts/ListLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticSourceItem } from '../components/molecules/DiagnosticSourceItem/DiagnosticSourceItem';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { useBuildContext } from '../providers/BuildContextProvider';

export const DiagnosticsPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const sourcesWithIssues = () => getAllDiagnosticSourceKeys(lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.entities.project.module || '?'}</ModuleName>
                    <PageTitle>Diagnostics</PageTitle>
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
