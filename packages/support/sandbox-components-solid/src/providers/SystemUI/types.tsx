import { ColourSchemeName } from '@noodles-ui/core-types';
import { Accessor, Setter } from 'solid-js';

export type SystemUIContextState = {
    theme: Accessor<string>;
    setTheme: Setter<string>;
    colourScheme: Accessor<ColourSchemeName>;
    setColourScheme: Setter<ColourSchemeName>;
};
