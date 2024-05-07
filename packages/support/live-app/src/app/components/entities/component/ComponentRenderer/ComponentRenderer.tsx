import { ComponentBuildContext } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';
import { Component } from 'solid-js';

import { Renderer } from '../../../atoms/Renderer/Renderer';

import styles from './ComponentRenderer.module.scss';

type ComponentRendererrops = {
    component: ComponentBuildContext;
};

export const ComponentRenderer: Component<ComponentRendererrops> = props => {
    const path = () => getResourceKey(props.component.entity).replace(':', '/');

    const classList = () => ({
        [styles.ComponentRenderer]: true,
    });

    return (
        <div classList={classList()}>
            <Renderer src={`http://localhost:3133/component/${path()}`} />
        </div>
    );
};
