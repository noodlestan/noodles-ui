'use client';
import { JSX, createSignal } from 'solid-js';

import styles from './Counter.module.css';

export default function Counter(): JSX.Element {
    const [count, setCount] = createSignal(0);
    return (
        <button class={styles.Counter} onClick={() => setCount(count() + 1)}>
            Clicks: {count()}
        </button>
    );
}
