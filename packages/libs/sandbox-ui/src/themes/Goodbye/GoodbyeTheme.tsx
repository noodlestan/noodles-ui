import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import tokens from '../../generated/theme.Goodbye.tokens';

import { GoodbyeTeamResource } from './GoodbyeTheme.nui';

import '../../generated/theme.Goodbye.css';

const c: Component = () => <></>;

const { extend, mode, ...rest } = GoodbyeTeamResource;

export const GoodbyeTheme: Theme = {
    ...rest,
    extend: extend.map(t => t.name),
    mode,
    component: c,
    tokens,
};
