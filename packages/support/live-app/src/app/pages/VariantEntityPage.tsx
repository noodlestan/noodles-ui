// import { Heading, Text } from '@noodles-ui/lab-ui';
import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ModuleName } from '../components/atoms/ModuleName';
import { PageHeader } from '../components/atoms/PageHeader/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { variantByKey } from '../providers/BuildContextProvider/variantByKey';

export const VariantEntityPage: Component = () => {
    const { lastSnapshot } = useBuildContext();
    const params = useParams();

    const variant = () => variantByKey(lastSnapshot(), params.key);
    const entity = () => variant().entity;

    return (
        <Show when={lastSnapshot()}>
            <PageLayout tag="main">
                <PageHeader>
                    <ModuleName>{entity().module}</ModuleName>
                    <PageTitle>Variant: {entity().name}</PageTitle>
                </PageHeader>
            </PageLayout>
        </Show>
    );
};