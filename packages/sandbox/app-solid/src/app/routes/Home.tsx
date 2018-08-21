import { Counter } from '@noodles-ui/sandbox-components-solid';
import { Heading, Text } from '@noodles-ui/sandbox-ui';
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
