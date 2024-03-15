import { Component, JSX } from 'solid-js';

import styles from './ModuleName.module.css';

type ModuleNameProps = {
    children: JSX.Element;
};

export const ModuleName: Component<ModuleNameProps> = props => {
    const classList = () => ({
        [styles.ModuleName]: true,
    });

    return <p classList={classList()}>{props.children}</p>;
};
