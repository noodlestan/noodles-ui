import { Component, For, Show } from 'solid-js';

import { EntityKeyLink } from '../../atoms/EntityKeyLink';
import { ListLayout } from '../../layouts/ListLayout';

type EntityDiagnosticsProps = {
    keys: string[];
};

export const EntityKeyList: Component<EntityDiagnosticsProps> = props => {
    return (
        <Show when={props.keys.length}>
            <ListLayout tag="ul">
                <For each={props.keys}>
                    {(key, index) => {
                        return (
                            <li>
                                <EntityKeyLink key={key} />
                                <Show when={index() < props.keys.length - 1}>
                                    <span>,</span>{' '}
                                </Show>
                            </li>
                        );
                    }}
                </For>
            </ListLayout>
        </Show>
    );
};
