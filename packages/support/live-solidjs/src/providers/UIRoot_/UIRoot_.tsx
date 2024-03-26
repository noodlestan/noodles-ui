import { ColourSchemeName } from '@noodles-ui/core-types';
import { Component, JSX } from 'solid-js';

type UIProps = {
    colourScheme: ColourSchemeName;
    theme: string;
    children?: JSX.Element;
};

export const UIRoot_: Component<UIProps> = props => <>{props.children}</>;
