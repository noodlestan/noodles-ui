import {
    ColourSchemeName,
    RootProvider,
    surfacesStore,
    themesStore,
} from '@noodles-ui/core-services';
import { Component, JSX } from 'solid-js';

import surfaces from './surfaces';
import themes from './themes';

// import '../styles/base/color.css';
// import '../styles/base/outline.css';
// import '../styles/base/radius.css';
// import '../styles/base/space.css';
// import '../styles/base/type.css';
// import '../styles/base/surfaces.css';

// import '../styles/invert/color.css';
// import '../styles/invert/surfaces.css';

// import '../styles/patterns/actions.css';
// import '../styles/patterns/dividers.css';
// import '../styles/patterns/data.css';
// import '../styles/patterns/transitions.css';

type ThemeProps = {
    colourScheme: ColourSchemeName;
    theme: string;
    children?: JSX.Element;
};

export const SandboxUI: Component<ThemeProps> = props => {
    const { registerSurface } = surfacesStore;
    const { registerTheme } = themesStore;

    themes.forEach(registerTheme);
    surfaces.forEach(registerSurface);

    return (
        <RootProvider colourScheme={props.colourScheme} theme={props.theme} surface="stage">
            {props.children}
        </RootProvider>
    );
};
