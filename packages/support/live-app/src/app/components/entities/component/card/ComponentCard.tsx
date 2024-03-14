import { ComponentContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { Card } from '../../../molecules/Card';

import styles from './ComponentCard.module.css';

type ComponentCardProps = {
    component: ComponentContext;
};

export const ComponentCard: Component<ComponentCardProps> = props => {
    const classList = () => ({
        [styles.ComponentCard]: true,
    });

    return (
        <Card classList={classList()}>
            <ModuleName>{props.component.instance?.module}</ModuleName>
            <EntityName>{props.component.instance?.name}</EntityName>
        </Card>
    );
};
