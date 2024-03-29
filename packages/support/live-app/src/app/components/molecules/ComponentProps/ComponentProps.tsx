import { ComponentBuildContextDto } from '@noodles-ui/support-types';
import { Component, Show } from 'solid-js';

import { SectionTitle } from '../../atoms/SectionTitle';
import { Collapsible } from '../Collapsible';
import { ComponentPropList } from '../ComponentPropList/ComponentPropList';

type ComponentPropsProps = {
    component: ComponentBuildContextDto;
};

export const ComponentProps: Component<ComponentPropsProps> = props => {
    const componentProps = () => Object.values(props.component.entity.props);

    return (
        <Show when={componentProps().length}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <SectionTitle>Props</SectionTitle>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <ComponentPropList props={componentProps()} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
