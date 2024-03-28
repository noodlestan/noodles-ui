import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './ListLayout.module.css';

type ListLayoutProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<ListLayoutProps, 'tag'> = {
    tag: 'div',
};

export const ListLayout: Component<ListLayoutProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.ListLayout]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
