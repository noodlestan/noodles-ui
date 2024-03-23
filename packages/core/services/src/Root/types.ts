import { SurfaceResource, SurfaceTokenMap, ThemeResource, TokenMap } from '@noodles-ui/core-types';
import { Component } from 'solid-js';

export type Theme = Omit<ThemeResource, 'type' | 'extend'> & {
    component: Component;
    extend: string[];
    tokens: {
        base: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
        [mode: string]: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
    };
};

export type Surface = SurfaceResource;
