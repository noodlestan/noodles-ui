// import { Heading, Text } from '@noodles-ui/lab-ui';
import { getDiagnosticByResourcetype } from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ThemeCard } from '../components/entities/theme/ThemeCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { useBuildContext } from '../providers/BuildContextProvider';
import { themes } from '../providers/BuildContextProvider/themes';

export const ThemesPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const diagnostics = () => getDiagnosticByResourcetype('theme', lastSnapshot()?.diagnostics);

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                <PageTitle>Themes</PageTitle>
            </PageHeader>
            <DiagnosticsBanner diagnostics={diagnostics()} />
            <SectionLayout>
                <></>
                <CardGrid>
                    <For each={themes(lastSnapshot())}>
                        {theme => <ThemeCard snapshot={lastSnapshot()} theme={theme} />}
                    </For>
                </CardGrid>
            </SectionLayout>
        </StageLayout>
    );
};
