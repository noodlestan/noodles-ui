import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from './SectionLayout.module.css';

type SectionLayoutProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

const defaultProps: Pick<SectionLayoutProps, 'tag'> = {
    tag: 'div',
};

export const SectionLayout: Component<SectionLayoutProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        [styles.SectionLayout]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
