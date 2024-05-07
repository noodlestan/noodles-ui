import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { ThemeBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    snapshot: BuildSnapshot;
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
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName type="theme">{entity().name}</EntityName>
            </EntityCardTitle>
            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.theme} />
        </EntityCard>
    );
};
