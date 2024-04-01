import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { ComponentBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './ComponentCard.module.css';

type ComponentCardProps = {
    snapshot: BuildSnapshot;
    component: ComponentBuildContext;
};

export const ComponentCard: Component<ComponentCardProps> = props => {
    const classList = () => ({
        [styles.ComponentCard]: true,
    });

    const path = () => `/component/${props.component.context.key}`;
    const entity = () => props.component.entity;

    return (
        <EntityCard classList={classList()} public={props.component.context.public} href={path()}>
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName>{entity().name}</EntityName>
            </EntityCardTitle>

            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.component} />
        </EntityCard>
    );
};
