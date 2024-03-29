import { SurfaceBuildContextDto } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './SurfaceCard.module.css';

type SurfaceCardProps = {
    surface: SurfaceBuildContextDto;
};

export const SurfaceCard: Component<SurfaceCardProps> = props => {
    const classList = () => ({
        [styles.SurfaceCard]: true,
    });

    const path = () => `/surface/${props.surface.context.key}`;
    const entity = () => props.surface.entity;

    return (
        <EntityCard classList={classList()} public={props.surface.context.public} href={path()}>
            <ModuleName>{entity().module}</ModuleName>
            <EntityName>{entity().name}</EntityName>
        </EntityCard>
    );
};
