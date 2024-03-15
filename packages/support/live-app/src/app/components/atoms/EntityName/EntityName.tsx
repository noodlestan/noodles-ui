import { Component, JSX } from 'solid-js';

import styles from './EntityName.module.css';

type EntityNameProps = {
    children: JSX.Element;
};

export const EntityName: Component<EntityNameProps> = props => {
    const classList = () => ({
        [styles.EntityName]: true,
    });

    return <p classList={classList()}>{props.children}</p>;
};
