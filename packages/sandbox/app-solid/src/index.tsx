import { LabUI } from '@noodles-ui/lab-ui';
import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { render } from 'solid-js/web';

import { App } from './app/App';

const root = document.getElementById('root') as HTMLElement;

render(() => {
    const systemUIContext = createSystemUIContext('hello');
    const { colourScheme, theme } = systemUIContext;
    return (
        <SystemUIProvider {...systemUIContext}>
            <LabUI colourScheme={colourScheme()} theme={theme()}>
                <App />
            </LabUI>
        </SystemUIProvider>
    );
}, root);
