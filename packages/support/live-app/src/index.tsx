import { SystemUIProvider, createSystemUIContext } from '@noodles-ui/sandbox-components-solid';
// import { LabUI } from '@noodles-ui/lab-ui';
import { render } from 'solid-js/web';

import { App } from './app/App';
import { DevServer } from './app/DevServer';

const root = document.getElementById('root') as HTMLElement;

render(() => {
    const systemUIContext = createSystemUIContext('hello');
    // const { colourScheme, theme } = systemUIContext;
    return (
        <SystemUIProvider {...systemUIContext}>
            {/* <LabUI colourScheme={colourScheme()} theme={theme()}> */}
            <DevServer>
                <App />
                {/* </LabUI> */}
                {/* TODO footer */}
                {/* {colourScheme()} / {theme()} */}
            </DevServer>
        </SystemUIProvider>
    );
}, root);

export { DevServer };
