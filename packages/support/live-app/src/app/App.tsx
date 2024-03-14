import { Route, Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { DevBar } from './components/app/DevBar.tsx/index.js';
import { NotFound } from './pages/404.jsx';
import { Home } from './pages/Home.jsx';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

export const Root: Component<RootProps> = props => {
    return (
        <>
            <DevBar />
            {/* <nav>
                <a href="/">Home</a>
            </nav> */}
            {props.children}
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
