import { VariantContextWithInstance } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './VariantCard.module.css';

type VariantCardProps = {
    variant: VariantContextWithInstance;
};

export const VariantCard: Component<VariantCardProps> = props => {
    const classList = () => ({
        [styles.VariantCard]: true,
    });

    const path = () => `/variant/${props.variant.key}`;
    const instance = () => props.variant.instance;

    return (
        <EntityCard classList={classList()} public={props.variant.public} href={path()}>
            <ModuleName>{instance().module}</ModuleName>
            <EntityName>{instance().name}</EntityName>
        </EntityCard>
    );
};
