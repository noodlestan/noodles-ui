import { TokenContextWithInstance } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

// import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { EntityCard } from '../../../molecules/EntityCard';

import styles from './TokenCard.module.css';

type TokenCardProps = {
    token: TokenContextWithInstance;
};

export const TokenCard: Component<TokenCardProps> = props => {
    const classList = () => ({
        [styles.TokenCard]: true,
    });

    const path = () => `/token/${props.token.key}`;
    const instance = () => props.token.instance;

    return (
        <EntityCard classList={classList()} public={props.token.public} href={path()}>
            <ModuleName>{instance().module}</ModuleName>
            {/* <EntityName>{instance().name}</EntityName> */}
        </EntityCard>
    );
};
