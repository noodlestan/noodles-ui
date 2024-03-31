import { TokenBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { EntityName } from '../../../atoms/EntityName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './TokenCard.module.css';

type TokenCardProps = {
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
            <EntityName small>{entity().name}</EntityName>
        </EntityCard>
    );
};
