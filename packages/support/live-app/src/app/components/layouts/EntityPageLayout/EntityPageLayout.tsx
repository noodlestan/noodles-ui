import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './EntityPageLayout.module.css';

type EntityPageLayoutProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<EntityPageLayoutProps, 'tag'> = {
    tag: 'div',
};

export const EntityPageLayout: Component<EntityPageLayoutProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.EntityPageLayout]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
