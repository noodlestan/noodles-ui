import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getTokens } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { TokenCard } from '../components/entities/token/TokenCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const TokensPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    return (
        <Show when={lastSnapshot()}>
            <StageLayout tag="main">
                <PageHeader>
                    <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                    <PageTitle>Tokens</PageTitle>
                </PageHeader>
                <SectionLayout>
                    <SectionTitle>Tokens</SectionTitle>
                    <CardGrid>
                        <For each={getTokens(lastSnapshot())}>
                            {token => (
                                <TokenCard
                                    snapshot={lastSnapshot() as BuildSnapshot}
                                    token={token}
                                />
                            )}
                        </For>
                    </CardGrid>
                </SectionLayout>
            </StageLayout>
        </Show>
    );
};
