import { ComponentContextWithInstance } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './ComponentCard.module.css';

type ComponentCardProps = {
    component: ComponentContextWithInstance;
};

export const ComponentCard: Component<ComponentCardProps> = props => {
    const classList = () => ({
        [styles.ComponentCard]: true,
    });

    const path = () => `/component/${props.component.key}`;
    const instance = () => props.component.instance;

    return (
        <EntityCard classList={classList()} public={props.component.public} href={path()}>
            <ModuleName>{instance().module}</ModuleName>
            <EntityName>{instance().name}</EntityName>
        </EntityCard>
    );
};
