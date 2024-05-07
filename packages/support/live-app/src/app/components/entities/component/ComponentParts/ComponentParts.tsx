import { ComponentBuildContext, ComponentImportEntity } from '@noodles-ui/core-entities';
import { Component, For } from 'solid-js';

import styles from './ComponentParts.module.scss';

type ComponentPartsProps = {
    component: ComponentBuildContext;
};

export const ComponentParts: Component<ComponentPartsProps> = props => {
    const entity = () => props.component.entity as ComponentImportEntity;

    const classList = () => ({
        [styles.ComponentParts]: true,
    });

    return (
        <div classList={classList()}>
            <ul>
                <For each={entity().parts}>{part => <li>{part.name}</li>}</For>
            </ul>
        </div>
    );
};
