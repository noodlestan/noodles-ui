import { Component, JSX } from 'solid-js';

import styles from './EntityName.module.css';

type EntityNameProps = {
    small?: boolean;
    children: JSX.Element;
};

export const EntityName: Component<EntityNameProps> = props => {
    const classList = () => ({
        [styles.EntityName]: true,
        [styles['EntityName-small']]: props.small,
    });

    return <p classList={classList()}>{props.children}</p>;
};
