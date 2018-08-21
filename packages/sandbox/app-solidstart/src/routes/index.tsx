import { Counter } from '@noodles-ui/sandbox-components-solid';
import { Heading, Text } from '@noodles-ui/sandbox-ui';
import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';

const Home: Component = () => {
    return (
        <main>
            <Title>Home</Title>
            <Heading>Hello world!!!</Heading>
            <Text>Small print</Text>
            <Counter />
        </main>
    );
};

export default Home;
