import { TokenContext } from '@noodles-ui/support-types';
import { Component } from 'solid-js';

// import { EntityName } from '../../../atoms/EntityName';
import { ModuleName } from '../../../atoms/ModuleName';
import { Card } from '../../../molecules/Card';

import styles from './TokenCard.module.css';

type TokenCardProps = {
    token: TokenContext;
};

export const TokenCard: Component<TokenCardProps> = props => {
    const classList = () => ({
        [styles.TokenCard]: true,
    });

    return (
        <Card classList={classList()}>
            <ModuleName>{props.token.instance?.module}</ModuleName>
            {/* <EntityName>{props.token.instance?.name}</EntityName> */}
        </Card>
    );
};
