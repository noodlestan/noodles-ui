'use client';
import { Component, createSignal } from 'solid-js';

import styles from './Counter.module.scss';

export const Counter: Component = () => {
    const [count, setCount] = createSignal(0);
    return (
        <button class={styles.Counter} onClick={() => setCount(count() + 1)}>
            Clicks: {count()}
        </button>
    );
};
