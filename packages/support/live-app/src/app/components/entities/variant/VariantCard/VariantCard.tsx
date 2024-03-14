import { VariantContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { Card } from '../../../molecules/Card';

import styles from './VariantCard.module.css';

type VariantCardProps = {
    variant: VariantContext;
};

export const VariantCard: Component<VariantCardProps> = props => {
    const classList = () => ({
        [styles.VariantCard]: true,
    });

    return (
        <Card classList={classList()}>
            <ModuleName>{props.variant.instance?.module}</ModuleName>
            <EntityName>{props.variant.instance?.name}</EntityName>
        </Card>
    );
};
