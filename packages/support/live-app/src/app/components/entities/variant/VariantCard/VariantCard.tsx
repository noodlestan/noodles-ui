import { VariantBuildContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './VariantCard.module.css';

type VariantCardProps = {
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
            <ModuleName>{entity().module}</ModuleName>
            <EntityName>{entity().name}</EntityName>
        </EntityCard>
    );
};
