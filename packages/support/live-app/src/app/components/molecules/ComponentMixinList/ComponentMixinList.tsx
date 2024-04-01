import { MixinEntity } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { ListLayout } from '../../layouts/ListLayout';

type ComponentMixinListProps = {
    mixins: MixinEntity[];
};

export const ComponentMixinList: Component<ComponentMixinListProps> = props => {
    return (
        <Show when={props.mixins.length}>
            <ListLayout tag="ul">
                <For each={props.mixins}>
                    {mixin => {
                        return <li>{mixin.name}</li>;
                    }}
                </For>
            </ListLayout>
        </Show>
    );
};
