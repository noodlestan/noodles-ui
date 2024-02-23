import { ColourSchemeName } from '@noodles-ui/core-types';
import { Accessor, createSignal } from 'solid-js';

const [colourScheme, setColourScheme] = createSignal<ColourSchemeName>('dark');

type ColourSchemeStore = {
    colourScheme: Accessor<ColourSchemeName>;
    setColourScheme: (name: ColourSchemeName) => void;
};

export const colourSchemeStore: ColourSchemeStore = {
    colourScheme,
    setColourScheme,
};
