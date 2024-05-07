import { A } from '@solidjs/router';
import { Component } from 'solid-js';

import styles from './HomeLink.module.scss';

export const HomeLink: Component = () => {
    const classList = () => ({
        [styles.HomeLink]: true,
    });

    return (
        <A end classList={classList()} href="/nui">
            NUI
        </A>
    );
};
