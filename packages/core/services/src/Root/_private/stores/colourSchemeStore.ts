import { Accessor, createSignal } from 'solid-js';

import { ColourSchemeName } from '../../types';

const [colourScheme, setColourScheme] = createSignal<ColourSchemeName>('dark');

type ColourSchemeStore = {
    colourScheme: Accessor<ColourSchemeName>;
    setColourScheme: (name: ColourSchemeName) => void;
};

export const colourSchemeStore: ColourSchemeStore = {
    colourScheme,
    setColourScheme,
};
