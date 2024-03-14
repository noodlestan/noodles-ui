import { ThemeContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { Card } from '../../../molecules/Card';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    theme: ThemeContext;
};

export const ThemeCard: Component<ThemeCardProps> = props => {
    const classList = () => ({
        [styles.ThemeCard]: true,
    });

    return (
        <Card classList={classList()}>
            <ModuleName>{props.theme.instance?.module}</ModuleName>
            <EntityName>{props.theme.instance?.name}</EntityName>
        </Card>
    );
};
