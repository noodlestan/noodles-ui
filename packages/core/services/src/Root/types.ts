import { SurfaceResource, ThemeResource } from '@noodles-ui/core-types';
import { Component } from 'solid-js';

export type Theme = ThemeResource & {
    component: Component;
};

export type Surface = SurfaceResource;
