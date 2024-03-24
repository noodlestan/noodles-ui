// import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { ColourSchemeName } from '@noodles-ui/core-types';
import { Route, Router, useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Dynamic, render } from 'solid-js/web';

import { UIRoot } from './UIRoot';
import componentDemoMap from './demo.map';

const root = document.getElementById('root') as HTMLElement;

const notFoundMessage =
    (name: string): Component =>
    () => <>Not found: {name}</>;

const mapComponent = (param: string): Component<never> => {
    if (!(param in componentDemoMap)) {
        return notFoundMessage(param);
    }
    return componentDemoMap[param];
};

const RenderComponent = () => {
    const params = useParams();
    const DemoComponent = () => (params.key ? mapComponent(params.key) : null);
    return (
        <Show when={DemoComponent}>
            <Dynamic component={DemoComponent as Component} />
        </Show>
    );
};

render(() => {
    // const systemUIContext = createSystemUIContext('hello');
    const colourScheme = () => 'dark' as ColourSchemeName;
    const theme = () => 'goodbye';
    // <SystemUIProvider {...systemUIContext}>
    // </SystemUIProvider>
    return (
        <>
            <UIRoot colourScheme={colourScheme()} theme={theme()}>
                <Router>
                    <Route path="/component/*key" component={RenderComponent} />
                    <Route path="*" component={notFoundMessage('?')} />
                </Router>
            </UIRoot>
        </>
    );
}, root);