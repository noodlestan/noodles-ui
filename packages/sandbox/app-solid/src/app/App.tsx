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
        <div>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>
            {props.children}
        </div>
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
