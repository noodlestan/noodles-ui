import {
    ComponentBuildContext,
    ComponentOwnEntity,
    getComponentMixins,
} from '@noodles-ui/core-entities';
import { isComponentImportResource } from '@noodles-ui/core-resources';
import { Component, Show } from 'solid-js';

import { SectionTitle } from '../../atoms/SectionTitle';
import { Collapsible } from '../Collapsible';
import { ComponentMixinList } from '../ComponentMixinList/ComponentMixinList';

type ComponentMixinsProps = {
    component: ComponentBuildContext;
};

export const ComponentMixins: Component<ComponentMixinsProps> = props => {
    const componentMixins = () => {
        if (!isComponentImportResource(props.component.entity)) {
            return getComponentMixins(props.component.entity as ComponentOwnEntity);
        }
        return [];
    };

    return (
        <Show when={componentMixins().length}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <SectionTitle>Styles</SectionTitle>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <ComponentMixinList mixins={componentMixins()} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
