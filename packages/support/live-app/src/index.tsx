import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
import { render } from 'solid-js/web';

import { App } from './app/App';
import { DevServer } from './app/DevServer';

const root = document.getElementById('root') as HTMLElement;

render(() => {
    const systemUIContext = createSystemUIContext('hello');
    return (
        <SystemUIProvider {...systemUIContext}>
            <DevServer>
                <App />
                {/* TODO footer */}
                {/* {colourScheme()} / {theme()} */}
            </DevServer>
        </SystemUIProvider>
    );
}, root);

export { DevServer };
