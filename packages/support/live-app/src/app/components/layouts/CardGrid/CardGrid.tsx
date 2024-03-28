import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './CardGrid.module.css';

type CardGridProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<CardGridProps, 'tag'> = {
    tag: 'div',
};

export const CardGrid: Component<CardGridProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.CardGrid]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
