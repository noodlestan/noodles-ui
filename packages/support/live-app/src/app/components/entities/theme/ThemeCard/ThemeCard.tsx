import { ThemeContextWithInstance } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    theme: ThemeContextWithInstance;
};

export const ThemeCard: Component<ThemeCardProps> = props => {
    const classList = () => ({
        [styles.ThemeCard]: true,
    });

    const path = () => `/theme/${props.theme.key}`;
    const instance = () => props.theme.instance;

    return (
        <EntityCard classList={classList()} public={props.theme.public} href={path()}>
            <ModuleName>{instance().module}</ModuleName>
            <EntityName>{instance().name}</EntityName>
        </EntityCard>
    );
};
