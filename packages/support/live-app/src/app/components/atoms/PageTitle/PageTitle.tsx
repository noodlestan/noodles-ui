import { Component, JSX } from 'solid-js';

import styles from './PageTitle.module.css';

type PageTitleProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const PageTitle: Component<PageTitleProps> = props => {
    const classList = () => ({
        [styles.PageTitle]: true,
    });

    return <h1 classList={classList()}>{props.children}</h1>;
};
