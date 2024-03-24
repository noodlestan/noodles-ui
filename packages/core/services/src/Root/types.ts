import { SurfaceResource, ThemeEntity } from '@noodles-ui/core-types';
import { Component } from 'solid-js';

export type Theme = Omit<ThemeEntity, 'type' | 'extend'> & {
    component: Component;
    extend: string[];
};

export type Surface = SurfaceResource;
