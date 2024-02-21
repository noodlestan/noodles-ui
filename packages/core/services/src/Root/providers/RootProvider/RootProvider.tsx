import { Component, For, JSX } from 'solid-js';

import { useBodyClassesEffect } from '../../_private/effects/useBodyClassesEffect';
import { themesStore } from '../../stores';
import { ColourSchemeName } from '../../types';
import { ColourSchemeProvider } from '../ColourSchemeProvider';
import { SurfaceProvider } from '../SurfaceProvider';
import { ThemeProvider } from '../ThemeProvider';
import { TokensProvider } from '../TokensProvider';

export type RootProviderProps = {
    colourScheme?: ColourSchemeName;
    theme: string;
    surface: string;
    children: JSX.Element;
    classList?: () => { [key: string]: boolean };
};

type BodyClassNameEffectProps = {
    classList?: () => { [key: string]: boolean };
};

const BodyClassNameEffect: Component<BodyClassNameEffectProps> = props => {
    useBodyClassesEffect(() => props.classList?.() || {});
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
                        <TokensProvider>
                            <BodyClassNameEffect classList={props.classList} />
                            {props.children}
                        </TokensProvider>
                    </SurfaceProvider>
                </ThemeProvider>
            </ColourSchemeProvider>
        </>
    );
};
