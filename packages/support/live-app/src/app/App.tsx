import { Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { Routes } from './Routes.jsx';
import { DevBar } from './components/app/DevBar.tsx/index.js';

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
            <Routes />
        </Router>
    );
};

export default App;
