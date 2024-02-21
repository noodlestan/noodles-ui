import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import tokens from '../../generated/theme.Goodbye.tokens';
import { Hello } from '../Hello/Hello.meta';

import '../../generated/theme.Goodbye.css';

const Comp: Component = () => <></>;

export const Goodbye: Theme = {
    name: 'goodbye',
    extends: [Hello],
    mode: 'dark',
    Component: Comp,
    tokens,
};
