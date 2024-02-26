import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import tokens from '../../generated/theme.Hello.tokens';

import { HelloTeamResource } from './HelloTheme.nui';

import '../../generated/theme.Hello.css';

const c: Component = () => <></>;

const { extend, mode, ...rest } = HelloTeamResource;

export const HelloTheme: Theme = {
    ...rest,
    extend: extend.map(t => t.name),
    mode,
    component: c,
    tokens,
};
