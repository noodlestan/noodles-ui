import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle';
import { DashboardGrid } from '../components/layouts/DashboardGrid';
import { StageLayout } from '../components/layouts/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { ItemsSection } from '../components/molecules/ItemsSection/ItemsSection';
import { useBuildContext } from '../providers/BuildContextProvider';

export const HomePage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                    <PageTitle>{lastSnapshot()?.project.name || '?'}</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={lastSnapshot()?.diagnostics} />
                <DashboardGrid>
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="surface"
                        title="Surfaces"
                        link="/surfaces"
                    />{' '}
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="mixin"
                        title="Mixins"
                        link="/mixins"
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="variant"
                        title="Variants"
                        link="/variants"
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="component"
                        title="Components"
                        link="/components"
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="theme"
                        title="Themes"
                        link="/themes"
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="token"
                        title="Tokens"
                        link="/tokens"
                    />
                </DashboardGrid>
            </StageLayout>
        </Show>
    );
};
