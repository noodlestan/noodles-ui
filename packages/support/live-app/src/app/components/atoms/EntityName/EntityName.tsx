import { Component, JSX } from 'solid-js';

import styles from './EntityName.module.css';

type EntityNameProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const EntityName: Component<EntityNameProps> = props => {
    const classList = () => ({
        [styles.EntityName]: true,
    });

    return <h1 classList={classList()}>{props.children}</h1>;
};
