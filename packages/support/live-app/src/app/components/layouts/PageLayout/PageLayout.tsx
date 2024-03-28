import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './PageLayout.module.css';

type PageLayoutProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<PageLayoutProps, 'tag'> = {
    tag: 'div',
};

export const PageLayout: Component<PageLayoutProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.PageLayout]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
