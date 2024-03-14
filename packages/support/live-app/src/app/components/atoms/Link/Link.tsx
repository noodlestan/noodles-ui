import { A } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import styles from './Link.module.css';

type LinkProps = {
    children: JSX.Element;
    href: string;
    onClick?: (ev: MouseEvent) => void;
};

export const Link: Component<LinkProps> = props => {
    const classList = () => ({
        [styles.Link]: true,
    });

    return (
        // eslint-disable-next-line solid/reactivity
        <A classList={classList()} onClick={props.onClick} href={props.href}>
            {props.children}
        </A>
    );
};
