import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { MixinBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './MixinCard.module.css';

type MixinCardProps = {
    snapshot: BuildSnapshot;
    mixin: MixinBuildContext;
};

export const MixinCard: Component<MixinCardProps> = props => {
    const classList = () => ({
        [styles.MixinCard]: true,
    });

    const path = () => `/mixin/${props.mixin.context.key}`;
    const entity = () => props.mixin.entity;

    return (
        <EntityCard classList={classList()} public={props.mixin.context.public} href={path()}>
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName>{entity().name}</EntityName>
            </EntityCardTitle>

            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.mixin} />
        </EntityCard>
    );
};
