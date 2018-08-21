import { Component } from 'solid-js';

export type TokenMap = {
    [key: string]: string;
};

type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type ColourSchemeName = 'dark' | 'light';

export type Theme = {
    name: string;
    extends: Theme[];
    mode: ColourSchemeName;
    Component: Component;
    tokens: {
        base: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
        invert: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
    };
};

export type Surface = {
    name: string;
    extends: string[];
};
