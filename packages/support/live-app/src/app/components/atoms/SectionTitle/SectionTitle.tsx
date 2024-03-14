import { Component, JSX } from 'solid-js';

import styles from './SectionTitle.module.css';

type SectionTitleProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const SectionTitle: Component<SectionTitleProps> = props => {
    const classList = () => ({
        [styles.SectionTitle]: true,
    });

    return <h1 classList={classList()}>{props.children}</h1>;
};
