// import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { Route, Router, useParams } from '@solidjs/router';
import { Component, JSX, Show } from 'solid-js';
import { Dynamic, render } from 'solid-js/web';

import { UIRoot } from './UIRoot';
import liveMap from './components/live.map';

import './root.css';

export type UnknownComponent = Component<{ children?: JSX.Element; [key: string]: unknown }>;

const root = document.getElementById('root') as HTMLElement;

const notFoundMessage =
    (name: string): Component =>
    () => <>Not found: {name}</>;

const mapComponent = (...params: string[]): UnknownComponent => {
    const param = params.find(param => param in liveMap);
    if (!param) {
        return notFoundMessage(params.join(','));
    }
    return liveMap[param] as UnknownComponent;
};

const RenderSurfaceDemo = () => {
    const DemoComponent = () => mapComponent('--surface-demo', '@noodles-ui/lab-ui/Text');
    const classList = () => ({
        '__live--surface': true,
    });
    return (
        <div classList={classList()}>
            <Show when={DemoComponent()}>
                <Dynamic component={DemoComponent() as Component} />
            </Show>
        </div>
    );
};

const RenderSurface = () => {
    const params = useParams();
    const surface = () => params.key.split('/').pop() || 'stage';
    const SurfaceComponent = mapComponent('--surface-component', '@noodles-ui/lab-ui/Heading');

    // TODO surfaceComponentProp ? default "variant"
    return (
        <SurfaceComponent variant={surface()}>
            <RenderSurfaceDemo />
        </SurfaceComponent>
    );
};

const RenderComponent = () => {
    const params = useParams();
    const DemoComponent = () => (params.key ? mapComponent(params.key) : null);
    return (
        <Show when={DemoComponent()}>
            <Dynamic component={DemoComponent() as Component} />
        </Show>
    );
};

render(() => {
    // const systemUIContext = createSystemUIContext('hello');
    // const { colourScheme, theme } = systemUIContext;
    // <SystemUIProvider {...systemUIContext}>
    // </SystemUIProvider>
    // <UIRoot colourScheme={colourScheme()} theme={theme()}>
    return (
        <>
            <UIRoot>
                <Router>
                    <Route path="/surface/*key" component={RenderSurface} />
                    <Route path="/component/*key" component={RenderComponent} />
                    <Route path="*" component={notFoundMessage('?')} />
                </Router>
            </UIRoot>
        </>
    );
}, root);
