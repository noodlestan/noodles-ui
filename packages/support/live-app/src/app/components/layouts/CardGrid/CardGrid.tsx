import { Component, JSX } from 'solid-js';

import styles from './CardGrid.module.css';

type CardGridProps = {
    children: JSX.Element;
};

export const CardGrid: Component<CardGridProps> = props => {
    const classList = () => ({
        [styles.CardGrid]: true,
    });

    return <div classList={classList()}>{props.children}</div>;
};
