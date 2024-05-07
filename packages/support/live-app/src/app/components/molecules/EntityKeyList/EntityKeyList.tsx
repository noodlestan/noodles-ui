import { Component, For, Show } from 'solid-js';

import { EntityKeyLink } from '../../atoms/EntityKeyLink';
import { ListLayout } from '../../layouts/ListLayout';

type EntityKeyListProps = {
    keys: string[];
};

export const EntityKeyList: Component<EntityKeyListProps> = props => {
    return (
        <Show when={props.keys.length}>
            <ListLayout tag="ul">
                <For each={props.keys}>
                    {key => {
                        return (
                            <li>
                                <EntityKeyLink key={key} />
                            </li>
                        );
                    }}
                </For>
            </ListLayout>
        </Show>
    );
};
