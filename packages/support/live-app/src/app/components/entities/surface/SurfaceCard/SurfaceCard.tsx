import { SurfaceContextWithInstance } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './SurfaceCard.module.css';

type SurfaceCardProps = {
    surface: SurfaceContextWithInstance;
};

export const SurfaceCard: Component<SurfaceCardProps> = props => {
    const classList = () => ({
        [styles.SurfaceCard]: true,
    });

    const path = () => `/variants/${props.surface.key}`;
    const instance = () => props.surface.instance;

    return (
        <EntityCard classList={classList()} public={props.surface.public} href={path()}>
            <ModuleName>{instance().module}</ModuleName>
            <EntityName>{instance().name}</EntityName>
        </EntityCard>
    );
};
