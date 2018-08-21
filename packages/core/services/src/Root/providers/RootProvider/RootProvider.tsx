import { Component, For, JSX } from 'solid-js';

import { useBodyClassesEffect } from '../../_private/effects/useBodyClassesEffect';
import { themesStore } from '../../stores';
import { ColourSchemeName } from '../../types';
import { ColourSchemeProvider } from '../ColourSchemeProvider';
import { SurfaceProvider } from '../SurfaceProvider';
import { ThemeProvider } from '../ThemeProvider';

export type RootProviderProps = {
    colourScheme?: ColourSchemeName;
    theme: string;
    surface: string;
    children: JSX.Element;
};

const BodyClassNameEffect: Component = () => {
    useBodyClassesEffect();
    return <></>;
};

export const RootProvider: Component<RootProviderProps> = props => {
    const { themes } = themesStore;
    return (
        <>
            <For each={themes()}>{theme => <theme.Component />}</For>
            <ColourSchemeProvider>
                <ThemeProvider theme={props.theme} shallow>
                    <SurfaceProvider surface={props.surface} shallow>
                        <BodyClassNameEffect />
                        {props.children}
                    </SurfaceProvider>
                </ThemeProvider>
            </ColourSchemeProvider>
        </>
    );
};
