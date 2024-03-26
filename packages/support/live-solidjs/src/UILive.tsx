import { ColourSchemeName } from '@noodles-ui/core-types';
import { Component, JSX } from 'solid-js';

import { UIRoot_ } from './providers/UIRoot_/UIRoot_';

type Props = {
    children: JSX.Element;
    colourScheme?: ColourSchemeName;
    theme?: string;
};

export const UILive: Component<Props> = props => {
    const colourScheme = () => props.colourScheme || 'dark';
    const theme = () => props.theme || 'hello';
    return (
        <>
            <UIRoot_ colourScheme={colourScheme()} theme={theme()}>
                {props.children}
            </UIRoot_>
        </>
    );
};
