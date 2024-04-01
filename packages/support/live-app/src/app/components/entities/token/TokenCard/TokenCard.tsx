import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { TokenBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityDiagnosticCounts } from '../../../atoms/EntityDiagnosticCounts';
import { EntityName } from '../../../atoms/EntityName';
import { EntityCard } from '../../../molecules/EntityCard';
import { EntityCardTitle } from '../../../molecules/EntityCardTitle';

import styles from './TokenCard.module.css';

type TokenCardProps = {
    snapshot: BuildSnapshot;
    token: TokenBuildContext;
};

export const TokenCard: Component<TokenCardProps> = props => {
    const classList = () => ({
        [styles.TokenCard]: true,
    });

    const path = () => `/token/${props.token.context.key}`;
    const entity = () => props.token.entity;

    return (
        <EntityCard classList={classList()} public={props.token.context.public} href={path()}>
            <EntityCardTitle>
                <EntityName small>{entity().name}</EntityName>
            </EntityCardTitle>

            <EntityDiagnosticCounts snapshot={props.snapshot} context={props.token} />
        </EntityCard>
    );
};
