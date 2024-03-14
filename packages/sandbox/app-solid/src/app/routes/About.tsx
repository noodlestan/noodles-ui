import { Heading, Text } from '@noodles-ui/lab-ui';
import { Component } from 'solid-js';

import styles from './About.module.scss';

export const About: Component = () => {
    return (
        <main class={styles.About}>
            <Heading>About</Heading>
            <Text>Lorem ipsum</Text>
        </main>
    );
};
