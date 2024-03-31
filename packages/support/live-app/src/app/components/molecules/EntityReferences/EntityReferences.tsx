import { UnknownBuildContext } from '@noodles-ui/core-entities';
import { Component, Show } from 'solid-js';

import { SectionTitle } from '../../atoms/SectionTitle';
import { Collapsible } from '../Collapsible';
import { EntityKeyList } from '../EntityKeyList/EntityKeyList';

const TITLE = {
    consumes: 'Uses',
    consumers: 'Used by',
};

type EntityDiagnosticsProps = {
    item: UnknownBuildContext;
    key: 'consumes' | 'consumers';
};

export const EntityReferences: Component<EntityDiagnosticsProps> = props => {
    const keys = () => Array.from(props.item.context[props.key]);

    return (
        <Show when={keys().length}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <SectionTitle>
                        {TITLE[props.key]} ({keys().length})
                    </SectionTitle>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <EntityKeyList keys={keys()} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
