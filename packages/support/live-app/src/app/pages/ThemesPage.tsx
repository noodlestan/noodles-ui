import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { ThemeBuildContext, getThemes } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ThemeCard } from '../components/entities/theme/ThemeCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ThemesPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const diagnostics = () => getDiagnosticByResourceType('theme', lastSnapshot()?.diagnostics);

    const params = useParams();
    const module = () => params.module;

    const isPublic = (theme: ThemeBuildContext) => !!theme.context.public;
    const themes = () =>
        getThemes(lastSnapshot()).filter(theme => {
            const mod = module();
            return isPublic(theme) && (!mod || theme.entity.module === mod);
        });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Themes</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <CardGrid>
                        <For each={themes()}>
                            {theme => (
                                <ThemeCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    theme={theme}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
