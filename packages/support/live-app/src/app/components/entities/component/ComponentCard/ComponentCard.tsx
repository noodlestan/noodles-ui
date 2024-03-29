import { ComponentBuildContextDto } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './ComponentCard.module.css';

type ComponentCardProps = {
    component: ComponentBuildContextDto;
};

export const ComponentCard: Component<ComponentCardProps> = props => {
    const classList = () => ({
        [styles.ComponentCard]: true,
    });

    const path = () => `/component/${props.component.context.key}`;
    const entity = () => props.component.entity;

    return (
        <EntityCard classList={classList()} public={props.component.context.public} href={path()}>
            <ModuleName>{entity().module}</ModuleName>
            <EntityName>{entity().name}</EntityName>
        </EntityCard>
    );
};
