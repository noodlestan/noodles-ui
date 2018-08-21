import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { SandboxUI } from '@noodles-ui/sandbox-ui';
import { render } from 'solid-js/web';

import { App } from './app/App';

const root = document.getElementById('root') as HTMLElement;

render(() => {
    const systemUIContext = createSystemUIContext('hello');
    const { colourScheme, theme } = systemUIContext;
    return (
        <SystemUIProvider {...systemUIContext}>
            <SandboxUI colourScheme={colourScheme()} theme={theme()}>
                <App />
            </SandboxUI>
        </SystemUIProvider>
    );
}, root);
