// import { Heading, Text } from '@noodles-ui/lab-ui';
import { Component, For } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { TokenCard } from '../components/entities/token/TokenCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { tokens } from '../providers/BuildContextProvider/tokens';

export const TokensPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    return (
        <StageLayout tag="main">
            <PageHeader>
                <ModuleName>{lastSnapshot()?.project.module || '?'}</ModuleName>
                <PageTitle>Tokens</PageTitle>
            </PageHeader>
            <SectionLayout>
                <SectionTitle>Tokens</SectionTitle>
                <CardGrid>
                    <For each={tokens(lastSnapshot())}>{token => <TokenCard token={token} />}</For>
                </CardGrid>
            </SectionLayout>
        </StageLayout>
    );
};
