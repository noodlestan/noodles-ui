import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getItemErrors, getItemWarnings } from '@noodles-ui/core-diagnostics';
import { ThemeBuildContext } from '@noodles-ui/core-entities';
import { getResourceTypedKey } from '@noodles-ui/core-resources';
import { Component } from 'solid-js';

import { DiagnosticCounts } from '../../../atoms/DiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    snapshot?: BuildSnapshot;
    theme: ThemeBuildContext;
};

export const ThemeCard: Component<ThemeCardProps> = props => {
    const errors = () =>
        getItemErrors(getResourceTypedKey(props.theme.entity), props.snapshot?.diagnostics);
    const warnings = () =>
        getItemWarnings(getResourceTypedKey(props.theme.entity), props.snapshot?.diagnostics);

    const classList = () => ({
        [styles.ThemeCard]: true,
    });

    const path = () => `/theme/${props.theme.context.key}`;
    const entity = () => props.theme.entity;

    return (
        <EntityCard classList={classList()} public={props.theme.context.public} href={path()}>
            <EntityCardTitle>
                <ModuleName>{entity().module}</ModuleName>
                <EntityName>{entity().name}</EntityName>
            </EntityCardTitle>
            <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />
        </EntityCard>
    );
};
