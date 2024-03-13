// import { Heading, Text } from '@noodles-ui/sandbox-ui';
import { Component, For } from 'solid-js';

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

    return (
        <main>
            <h1>components</h1>
            <For each={Object.entries(lastBuild()?.snapshot.components || {})}>
                {([key, component]) => (
                    <p>
                        {key} / {component.instance.name}
                    </p>
                )}
            </For>
        </main>
    );
};
