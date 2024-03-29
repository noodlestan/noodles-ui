import { ComponentBuildContextDto, getResourceKey } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import styles from './ComponentRenderer.module.scss';

type EntityDiagnosticsProps = {
    component: ComponentBuildContextDto;
};

export const ComponentRenderer: Component<EntityDiagnosticsProps> = props => {
    const path = () => getResourceKey(props.component.entity).replace(':', '/');

    const classList = () => ({
        [styles.ComponentRenderer]: true,
    });

    return (
        <div classList={classList()}>
            <iframe src={`http://localhost:3133/component/${path()}`} />
        </div>
    );
};
