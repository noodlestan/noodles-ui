import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { ComponentEntityPage } from './pages/ComponentEntityPage';
import { EntitiesPage } from './pages/EntitiesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Routes: Component = () => {
    return (
        <>
            <Route path={'/'} component={EntitiesPage} />
            <Route path={'/component/*key'} component={ComponentEntityPage} />
            <Route path={'*'} component={NotFoundPage} />
        </>
    );
};
