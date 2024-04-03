import { A } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import styles from './Link.module.scss';

type LinkProps = {
    children: JSX.Element;
    href: string;
    onClick?: (ev: MouseEvent) => void;
};

export const Link: Component<LinkProps> = props => {
    const classList = () => ({
        [styles.Link]: true,
    });

    const handleClick = (ev: MouseEvent) => props.onClick?.(ev);

    return (
        <A classList={classList()} onClick={handleClick} href={props.href}>
            {props.children}
        </A>
    );
};
