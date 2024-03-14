import { Component, JSX } from 'solid-js';

import styles from './ModuleName.module.css';

type ModuleNameProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const ModuleName: Component<ModuleNameProps> = props => {
    const classList = () => ({
        [styles.ModuleName]: true,
    });

    return <h1 classList={classList()}>{props.children}</h1>;
};
