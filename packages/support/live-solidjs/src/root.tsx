// import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { Route, Router, useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Dynamic, render } from 'solid-js/web';

import { UILive } from './UILive';
import liveMap from './components/live.map';

const root = document.getElementById('root') as HTMLElement;

const notFoundMessage =
    (name: string): Component =>
    () => <>Not found: {name}</>;

const mapComponent = (param: string): Component<never> => {
    if (!(param in liveMap)) {
        return notFoundMessage(param);
    }
    return liveMap[param];
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
    // const { colourScheme, theme } = systemUIContext;
    // <SystemUIProvider {...systemUIContext}>
    // </SystemUIProvider>
    // <UILive colourScheme={colourScheme()} theme={theme()}>
    return (
        <>
            <UILive>
                <Router>
                    <Route path="/component/*key" component={RenderComponent} />
                    <Route path="*" component={notFoundMessage('?')} />
                </Router>
            </UILive>
        </>
    );
}, root);
