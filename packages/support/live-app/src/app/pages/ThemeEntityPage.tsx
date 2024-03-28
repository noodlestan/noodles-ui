// import { Heading, Text } from '@noodles-ui/lab-ui';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { themeByKey } from '../providers/BuildContextProvider/themeByKey';

export const ThemeEntityPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const theme = () => themeByKey(lastSnapshot(), params.key);
    const entity = () => theme().entity;

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Theme: {entity().name}</PageTitle>
                </PageHeader>
            </PageLayout>
        </Show>
    );
};
