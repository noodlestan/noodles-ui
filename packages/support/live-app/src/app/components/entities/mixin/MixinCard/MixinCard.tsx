import { MixinBuildContextDto } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './MixinCard.module.css';

type MixinCardProps = {
    mixin: MixinBuildContextDto;
};

export const MixinCard: Component<MixinCardProps> = props => {
    const classList = () => ({
        [styles.MixinCard]: true,
    });

    const path = () => `/mixin/${props.mixin.context.key}`;
    const entity = () => props.mixin.entity;

    return (
        <EntityCard classList={classList()} public={props.mixin.context.public} href={path()}>
            <ModuleName>{entity().module}</ModuleName>
            <EntityName>{entity().name}</EntityName>
        </EntityCard>
    );
};
