import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './DashboardGrid.module.css';

type DashboardGridProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<DashboardGridProps, 'tag'> = {
    tag: 'div',
};

export const DashboardGrid: Component<DashboardGridProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.DashboardGrid]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
