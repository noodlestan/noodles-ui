import { Surface } from '@noodles-ui/sandbox-ui';
import { Route, Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { NotFound } from './routes/404';
import { About } from './routes/About';
import { Home } from './routes/Home';

import './app.css';

type RootProps = {
    children?: JSX.Element;
};

export const Root: Component<RootProps> = props => {
    return (
        <>
            <Surface tag="nav" variant="inverse">
                <a href="/">Home</a>
                <a href="/about">About</a>
            </Surface>
            <Surface tag="main" variant="page">
                {props.children}
            </Surface>
        </>
    );
};

export const App: Component = () => {
    return (
        <Router root={Root}>
            <Route path={'/'} component={Home} />
            <Route path={'/about'} component={About} />
            <Route path={'*'} component={NotFound} />
        </Router>
    );
};

export default App;
