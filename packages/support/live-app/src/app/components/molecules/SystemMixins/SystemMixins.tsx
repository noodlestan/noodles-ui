import { SystemBuildContext } from '@noodles-ui/core-entities';
import { Component, Show } from 'solid-js';

import { SectionTitle } from '../../atoms/SectionTitle';
import { ComponentMixinList } from '../../entities/component/ComponentMixinList/ComponentMixinList';
import { Collapsible } from '../Collapsible';

type SystemMixinsProps = {
    system: SystemBuildContext;
};

export const SystemMixins: Component<SystemMixinsProps> = props => {
    const mixins = () => props.system.entity.use || [];

    return (
        <Show when={mixins().length}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <SectionTitle>Styles</SectionTitle>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <ComponentMixinList mixins={mixins()} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
