import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Routes: Component = () => {
    return (
        <>
            <Route path={'/'} component={HomePage} />
            <Route path={'*'} component={NotFoundPage} />
        </>
    );
};
