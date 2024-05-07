import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getDiagnosticByResourceType } from '@noodles-ui/core-diagnostics';
import { TokenBuildContext, getTokens } from '@noodles-ui/core-entities';
import { useParams } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { TokenCard } from '../components/entities/token/TokenCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { DiagnosticsBanner } from '../components/molecules/DiagnosticsBanner/DiagnosticsBanner';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const TokensPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const diagnostics = () => getDiagnosticByResourceType('token', lastSnapshot()?.diagnostics);

    const params = useParams();
    const module = () => params.module;

    const isPublic = (token: TokenBuildContext) => !!token.context.public;
    const tokens = () =>
        getTokens(lastSnapshot()).filter(token => {
            const mod = module();
            return isPublic(token) && (!mod || token.entity.module === mod);
        });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} isList />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>Tokens</PageTitle>
                </PageHeader>
                <DiagnosticsBanner diagnostics={diagnostics()} />
                <SectionLayout>
                    <CardGrid>
                        <For each={tokens()}>
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
