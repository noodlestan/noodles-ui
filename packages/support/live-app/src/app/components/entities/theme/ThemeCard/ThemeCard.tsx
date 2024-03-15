import { ThemeBuildContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    theme: ThemeBuildContext;
};

export const ThemeCard: Component<ThemeCardProps> = props => {
    const classList = () => ({
        [styles.ThemeCard]: true,
    });

    const path = () => `/theme/${props.theme.context.key}`;
    const entity = () => props.theme.entity;

    return (
        <EntityCard classList={classList()} public={props.theme.context.public} href={path()}>
            <ModuleName>{entity().module}</ModuleName>
            <EntityName>{entity().name}</EntityName>
        </EntityCard>
    );
};
