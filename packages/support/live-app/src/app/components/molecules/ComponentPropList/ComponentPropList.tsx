import { PropEntity } from '@noodles-ui/core-types';
import { Component, For, Show } from 'solid-js';

import { ListLayout } from '../../layouts/ListLayout';

type ComponentPropListProps = {
    props: PropEntity[];
};

export const ComponentPropList: Component<ComponentPropListProps> = props => {
    return (
        <Show when={props.props.length}>
            <ListLayout tag="ul">
                <For each={props.props}>
                    {prop => {
                        return <li>{prop.name}</li>;
                    }}
                </For>
            </ListLayout>
        </Show>
    );
};
