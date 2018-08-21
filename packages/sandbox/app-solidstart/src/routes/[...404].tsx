import { Heading, Text } from '@noodles-ui/sandbox-ui';
import { Title } from '@solidjs/meta';
import { HttpStatusCode } from '@solidjs/start';
import { Component } from 'solid-js';

const NotFound: Component = () => {
    return (
        <main>
            <Title>Not Found</Title>
            <HttpStatusCode code={404} />
            <Heading>About</Heading>
            <Text>Lorem ipsum</Text>
        </main>
    );
};

export default NotFound;
