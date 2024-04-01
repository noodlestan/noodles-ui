import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { getThemes } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ThemeCard } from '../components/entities/theme/ThemeCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ThemesPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const diagnostics = () => getDiagnosticByResourceType('theme', lastSnapshot()?.diagnostics);

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                    <PageTitle>Themes</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <></>
                    <CardGrid>
                        <For each={getThemes(lastSnapshot())}>
                            {theme => <ThemeCard snapshot={lastSnapshot()} theme={theme} />}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
