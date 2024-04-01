import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { VariantBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './VariantCard.module.css';

type VariantCardProps = {
    snapshot: BuildSnapshot;
    variant: VariantBuildContext;
};

export const VariantCard: Component<VariantCardProps> = props => {
    const classList = () => ({
        [styles.VariantCard]: true,
    });

    const path = () => `/variant/${props.variant.context.key}`;
    const entity = () => props.variant.entity;

    return (
        <EntityCard classList={classList()} public={props.variant.context.public} href={path()}>
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName>{entity().name}</EntityName>
            </EntityCardTitle>
            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.variant} />
        </EntityCard>
    );
};
