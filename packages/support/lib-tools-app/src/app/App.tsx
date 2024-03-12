import { Route, Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { DevBar } from './components/molecules/DevBar.tsx';
import { NotFound } from './routes/404';
import { Home } from './routes/Home';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

export const Root: Component<RootProps> = props => {
    return (
        <>
            <DevBar />
            <nav>
                <a href="/">Home</a>
            </nav>
            <main>{props.children}</main>
        </>
    );
};

export const App: Component = () => {
    return (
        <Router root={Root}>
            <Route path={'/'} component={Home} />
            <Route path={'*'} component={NotFound} />
        </Router>
    );
};

export default App;
