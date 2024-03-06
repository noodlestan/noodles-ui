import { RootProvider, surfacesStore, themesStore } from '@noodles-ui/core-services';
import { surfaceClasslist } from '@noodles-ui/core-styled';
import { ColourSchemeName } from '@noodles-ui/core-types';
import { Component, JSX } from 'solid-js';

import surfaces from '../nui/surfaces.nui';

import themes from './themes';

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

    const classList = () => surfaceClasslist();

    return (
        <RootProvider
            colourScheme={props.colourScheme}
            theme={props.theme}
            surface="stage"
            classList={classList}
        >
            {props.children}
        </RootProvider>
    );
};