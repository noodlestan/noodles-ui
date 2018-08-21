// @refresh reload
import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { SandboxUI } from '@noodles-ui/sandbox-ui';
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
                <SandboxUI colourScheme={colourScheme()} theme={theme()}>
                    <Suspense>{props.children}</Suspense>
                </SandboxUI>
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
