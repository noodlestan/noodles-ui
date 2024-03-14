import { Heading, Text } from '@noodles-ui/lab-ui';
import { Counter } from '@noodles-ui/sandbox-components-solid';
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
