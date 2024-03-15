import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { ComponentPage } from './pages/ComponentPage';
import { EntitiesPage } from './pages/EntitiesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Routes: Component = () => {
    return (
        <>
            <Route path={'/'} component={EntitiesPage} />
            <Route path={'/component/*key'} component={ComponentPage} />
            <Route path={'*'} component={NotFoundPage} />
        </>
    );
};
