import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { Component, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { DashboardGrid } from '../components/layouts/DashboardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout';
import { DependencyList } from '../components/molecules/DependencyList/DependencyList';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { ItemsSection } from '../components/molecules/ItemsSection/ItemsSection';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { SystemSection } from '../components/molecules/SystemSection/SystemSection';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const ProjectPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const isSystem = () => !!lastSnapshot()?.project.system;
    const module = () => lastSnapshot()?.project.module;
    const link = (base: string) => `/${base}/${module()}`;

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>{lastSnapshot()?.project.name || '?'}</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={lastSnapshot()?.diagnostics} />
                <Show when={isSystem()}>
                    <SystemSection snapshot={lastSnapshot()} />
                </Show>
                <DashboardGrid>
                    <Show when={isSystem()}>
                        <ItemsSection
                            snapshot={lastSnapshot()}
                            type="surface"
                            title="Surfaces"
                            link={link('surfaces')}
                        />{' '}
                    </Show>

                    <Show when={!isSystem()}>
                        <ItemsSection
                            snapshot={lastSnapshot()}
                            type="mixin"
                            title="Mixins"
                            link={link('mixins')}
                        />
                        <ItemsSection
                            snapshot={lastSnapshot()}
                            type="variant"
                            title="Variants"
                            link={link('variants')}
                        />
                    </Show>
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="component"
                        title="Components"
                        link={link('components')}
                    />
                    <Show when={isSystem()}>
                        <ItemsSection
                            snapshot={lastSnapshot()}
                            type="theme"
                            title="Themes"
                            link={link('themes')}
                        />
                    </Show>
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="token"
                        title="Tokens"
                        link={link('tokens')}
                    />
                </DashboardGrid>
                <SectionLayout>
                    <SectionTitle>Dependencies</SectionTitle>
                    <DependencyList snapshot={lastSnapshot() as BuildSnapshot} />
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
