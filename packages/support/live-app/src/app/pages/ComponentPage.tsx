// import { Heading, Text } from '@noodles-ui/lab-ui';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { componentByKey } from '../providers/BuildContextProvider/componentByKey';

export const ComponentPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const component = () => componentByKey(lastSnapshot(), params.key);
    const instance = () => component().instance;

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{instance().module}</ModuleName>
                    <PageTitle>Component: {instance().name}</PageTitle>
                </PageHeader>
                <Show when={component()}>
                    <iframe src={`http://localhost:3133/component/${params.key}`} />
                </Show>
            </PageLayout>
        </Show>
    );
};
