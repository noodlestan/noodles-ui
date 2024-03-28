// import { Heading, Text } from '@noodles-ui/lab-ui';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { tokenByKey } from '../providers/BuildContextProvider/tokenByKey';

export const TokenEntityPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const token = () => tokenByKey(lastSnapshot(), params.key);
    const entity = () => token().entity;

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Token: {entity().name}</PageTitle>
                </PageHeader>
            </PageLayout>
        </Show>
    );
};
