import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { SurfaceBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './SurfaceCard.module.css';

type SurfaceCardProps = {
    snapshot: BuildSnapshot;
    surface: SurfaceBuildContext;
};

export const SurfaceCard: Component<SurfaceCardProps> = props => {
    const classList = () => ({
        [styles.SurfaceCard]: true,
    });

    const path = () => `/surface/${props.surface.context.key}`;
    const entity = () => props.surface.entity;

    return (
        <EntityCard classList={classList()} public={props.surface.context.public} href={path()}>
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName type="surface">{entity().name}</EntityName>
            </EntityCardTitle>

            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.surface} />
        </EntityCard>
    );
};
