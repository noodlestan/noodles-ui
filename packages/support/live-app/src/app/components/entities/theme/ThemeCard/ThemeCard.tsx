import {
    BuildSnapshotDto,
    ThemeBuildContext,
    getItemErrors,
    getItemWarnings,
    getResourceTypedKey,
} from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { WarningsErrors } from '../../../atoms/WarningsErrors';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './ThemeCard.module.css';

type ThemeCardProps = {
    snapshot?: BuildSnapshotDto;
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
            <WarningsErrors warnings={warnings().length} errors={errors().length} mini />
        </EntityCard>
    );
};
