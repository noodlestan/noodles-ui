// @refresh reload
import { LabUI } from '@noodles-ui/lab-ui';
import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Component, JSX, Suspense } from 'solid-js';

type RootProps = {
    children?: JSX.Element;
};

export const Root: Component<RootProps> = props => {
    const systemUIContext = createSystemUIContext('hello');
    const { colourScheme, theme } = systemUIContext;
    return (
        <MetaProvider>
            <SystemUIProvider {...systemUIContext}>
                <LabUI colourScheme={colourScheme()} theme={theme()}>
                    <Suspense>{props.children}</Suspense>
                </LabUI>
            </SystemUIProvider>
        </MetaProvider>
    );
};
export const App: Component = () => {
    return (
        <Router root={Root}>
            <FileRoutes />
        </Router>
    );
};

export default App;
