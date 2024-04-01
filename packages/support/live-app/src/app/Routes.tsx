import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { ComponentEntityPage } from './pages/ComponentEntityPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { HomePage } from './pages/HomePage';
import { MixinEntityPage } from './pages/MixinEntityPage';
import { MixinsPage } from './pages/MixinsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SurfaceEntityPage } from './pages/SurfaceEntityPage';
import { SurfacesPage } from './pages/SurfacesPage';
import { SystemEntityPage } from './pages/SystemEntityPage';
import { ThemeEntityPage } from './pages/ThemeEntityPage';
import { ThemesPage } from './pages/ThemesPage';
import { TokenEntityPage } from './pages/TokenEntityPage';
import { TokensPage } from './pages/TokensPage';
import { VariantEntityPage } from './pages/VariantEntityPage';
import { VariantsPage } from './pages/VariantsPage';

export const Routes: Component = () => {
    return (
        <>
            <Route path={'/'} component={HomePage} />
            <Route path={'/system'} component={SystemEntityPage} />
            <Route path={'/system/*'} component={SystemEntityPage} />
            <Route path={'/surfaces'} component={SurfacesPage} />
            <Route path={'/surface/*key'} component={SurfaceEntityPage} />
            <Route path={'/mixins'} component={MixinsPage} />
            <Route path={'/mixin/*key'} component={MixinEntityPage} />
            <Route path={'/variants'} component={VariantsPage} />
            <Route path={'/variant/*key'} component={VariantEntityPage} />
            <Route path={'/components'} component={ComponentsPage} />
            <Route path={'/component/*key'} component={ComponentEntityPage} />
            <Route path={'/tokens'} component={TokensPage} />
            <Route path={'/token/*key'} component={TokenEntityPage} />
            <Route path={'/themes'} component={ThemesPage} />
            <Route path={'/theme/*key'} component={ThemeEntityPage} />
            <Route path={'/diagnostics'} component={DiagnosticsPage} />
            <Route path={'*'} component={NotFoundPage} />
        </>
    );
};
