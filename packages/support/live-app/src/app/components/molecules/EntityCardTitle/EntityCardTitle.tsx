import { Component, JSX } from 'solid-js';

import styles from './EntityCardTitle.module.css';

type EntityCardTitleProps = {
    children: JSX.Element;
};

export const EntityCardTitle: Component<EntityCardTitleProps> = props => {
    const classList = () => ({
        [styles.EntityCardTitle]: true,
    });

    return <div classList={classList()}>{props.children}</div>;
};
