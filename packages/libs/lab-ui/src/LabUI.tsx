import { RootProvider, surfacesStore, themesStore } from '@noodles-ui/core-services';
import { surfaceClassList } from '@noodles-ui/core-styled';
import { ColourSchemeName } from '@noodles-ui/core-types';
import { Component, JSX } from 'solid-js';

import surfaces from './nui/entities/surfaces.nui';
import themes from './themes/themes';

type UIProps = {
    colourScheme: ColourSchemeName;
    theme: string;
    children?: JSX.Element;
};

export const LabUI: Component<UIProps> = props => {
    const { registerSurface } = surfacesStore;
    const { registerTheme } = themesStore;

    themes.forEach(registerTheme);
    surfaces.forEach(registerSurface);

    const classList = () => surfaceClassList();

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
