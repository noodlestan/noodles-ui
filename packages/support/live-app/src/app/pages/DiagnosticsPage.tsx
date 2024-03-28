// import { Heading, Text } from '@noodles-ui/lab-ui';
import {
    getAllDiagnosticSourceKeys,
    getDiagnosticErrors,
    getDiagnosticWarnings,
} from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { WarningsErrors } from '../components/atoms/WarningsErrors';
import { ListLayout } from '../components/layouts/ListLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticSourceItem } from '../components/molecules/DiagnosticSourceItem/DiagnosticSourceItem';
import { useBuildContext } from '../providers/BuildContextProvider';

export const DiagnosticsPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const sourcesWithIssues = () => getAllDiagnosticSourceKeys(lastSnapshot()?.diagnostics);
    const errorCount = () => getDiagnosticErrors(lastSnapshot()?.diagnostics).length;
    const warnCount = () => getDiagnosticWarnings(lastSnapshot()?.diagnostics).length;

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                <PageTitle>Diagnostics</PageTitle>
                <WarningsErrors warnings={warnCount()} errors={errorCount()} />
            </PageHeader>
            <ListLayout tag="ul">
                <SectionTitle>Items with issues</SectionTitle>
                <For each={sourcesWithIssues()}>
                    {sourceKey => (
                        <DiagnosticSourceItem sourceKey={sourceKey} snapshot={lastSnapshot()} />
                    )}
                </For>
            </ListLayout>
        </StageLayout>
    );
};
