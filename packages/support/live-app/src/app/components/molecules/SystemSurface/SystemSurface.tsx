import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import {
    ComponentBuildContext,
    NUI,
    SystemBuildContext,
    getEntityByKey,
} from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';
import { Component, Show } from 'solid-js';

import { ErrorInline } from '../../atoms/ErrorInline';
import { SectionTitle } from '../../atoms/SectionTitle';
import { ComponentCard } from '../../entities/component/ComponentCard';
import { Collapsible } from '../Collapsible';

type SystemSurfaceProps = {
    snapshot?: BuildSnapshot;
    system: SystemBuildContext;
};

export const SystemSurface: Component<SystemSurfaceProps> = props => {
    const hasSurface = () => !!props.system.entity.surface;
    const componentKey = () => getResourceKey(props.system.entity.surface?.component || {});
    const component = () => getEntityByKey(props.snapshot, NUI.component, componentKey());

    return (
        <Show when={hasSurface()}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <SectionTitle>Surface</SectionTitle>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <Show when={component()}>
                        <ComponentCard
                            snapshot={props.snapshot as BuildSnapshot}
                            component={component() as ComponentBuildContext}
                        />
                    </Show>
                    <Show when={!component()}>
                        <ErrorInline>Component {componentKey()} not found.</ErrorInline>
                    </Show>
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
