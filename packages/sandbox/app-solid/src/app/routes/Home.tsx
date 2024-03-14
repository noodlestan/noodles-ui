import { Heading, Text } from '@noodles-ui/lab-ui';
import { Counter } from '@noodles-ui/sandbox-components-solid';
import { Component } from 'solid-js';

export const Home: Component = () => {
    return (
        <main>
            <Heading>Hello world!!!</Heading>
            <Text>Small print</Text>
            <Counter />
        </main>
    );
};
