import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import tokens from '../../generated/theme.Hello.tokens';

const Comp: Component = () => <></>;

export const Hello: Theme = {
    name: 'hello',
    extends: [],
    mode: 'dark',
    Component: Comp,
    tokens,
};
