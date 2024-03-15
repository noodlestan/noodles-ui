import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './StageLayout.module.css';

type StageLayoutProps = {
    tag?: string;
    children: JSX.Element;
};

const defaultProps: Pick<StageLayoutProps, 'tag'> = {
    tag: 'div',
};

export const StageLayout: Component<StageLayoutProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        [styles.StageLayout]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
