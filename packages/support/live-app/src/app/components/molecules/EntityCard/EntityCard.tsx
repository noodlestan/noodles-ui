import { Component, JSX, Show } from 'solid-js';

import styles from './EntityCard.module.css';

type EntityCardProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
    public?: boolean;
    href?: string;
    onClick?: (ev: MouseEvent) => void;
    isInteractive?: boolean;
};

export const EntityCard: Component<EntityCardProps> = props => {
    const isInteractive = () => !!props.href || (!!props.onClick && props.isInteractive);
    const classList = () => ({
        [styles.EntityCard]: true,
        [styles['EntityCard-is-interactive']]: isInteractive(),
        [styles['EntityCard-is-public']]: props.public,
        ...(props.classList || {}),
    });

    const handleClick = (ev: MouseEvent) => props.onClick?.(ev);

    return (
        <>
            <Show when={props.href}>
                <a href={props.href} classList={classList()} onClick={handleClick}>
                    {props.children}
                </a>
            </Show>
            <Show when={!props.href}>
                <div classList={classList()}>{props.children}</div>;
            </Show>
        </>
    );
};
