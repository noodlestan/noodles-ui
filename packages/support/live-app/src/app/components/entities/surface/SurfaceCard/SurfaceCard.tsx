import { SurfaceContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { Card } from '../../../molecules/Card';

import styles from './SurfaceCard.module.css';

type SurfaceCardProps = {
    surface: SurfaceContext;
};

export const SurfaceCard: Component<SurfaceCardProps> = props => {
    const classList = () => ({
        [styles.SurfaceCard]: true,
    });

    return (
        <Card classList={classList()}>
            <ModuleName>{props.surface.instance?.module}</ModuleName>
            <EntityName>{props.surface.instance?.name}</EntityName>
        </Card>
    );
};
