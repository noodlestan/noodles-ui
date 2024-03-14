// import { Heading, Text } from '@noodles-ui/sandbox-ui';
import { Component, For } from 'solid-js';

import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ComponentCard } from '../components/entities/component/card/ComponentCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';

export const Home: Component = () => {
    const { builds } = useBuildContext();

    const lastBuild = () => {
        const items = builds();
        if (!items.length) {
            return;
        }
        return items[items.length - 1];
    };

    const components = () =>
        Object.values(lastBuild()?.snapshot.components || {}).filter(component => component.public);

    return (
        <PageLayout tag="main">
            <PageTitle>components</PageTitle>
            <CardGrid>
                <For each={components()}>
                    {component => <ComponentCard component={component} />}
                </For>
            </CardGrid>
        </PageLayout>
    );
};
