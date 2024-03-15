import { Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { Routes } from './Routes.jsx';
import { DevBar } from './components/app/DevBar';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

export const Root: Component<RootProps> = props => {
    return (
        <>
            {/* <nav>
                <a href="/">Home</a>
            </nav> */}
            <DevBar />
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
