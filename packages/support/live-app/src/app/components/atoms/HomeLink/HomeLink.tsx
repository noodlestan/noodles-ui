import { A } from '@solidjs/router';
import { Component } from 'solid-js';

import styles from './HomeLink.module.css';

export const HomeLink: Component = () => {
    const classList = () => ({
        [styles.HomeLink]: true,
    });

    return (
        <A end classList={classList()} href="/">
            NUI
        </A>
    );
};
