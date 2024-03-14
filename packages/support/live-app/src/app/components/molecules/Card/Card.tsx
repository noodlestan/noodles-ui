import { Component, JSX } from 'solid-js';

import styles from './Card.module.css';

type CardProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const Card: Component<CardProps> = props => {
    const classList = () => ({
        [styles.Card]: true,
        ...(props.classList || {}),
    });
    return <div classList={classList()}>{props.children}</div>;
};
