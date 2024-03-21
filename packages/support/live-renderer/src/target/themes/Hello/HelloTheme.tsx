import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import { HelloTeamResource } from './HelloTheme.nui';
import tokens from './HelloTheme.tokens';

import './HelloTheme.css';

const c: Component = () => <></>;

const { extend, mode, ...rest } = HelloTeamResource;

export const HelloTheme: Theme = {
    ...rest,
    extend: extend.map(t => t.name),
    mode,
    component: c,
    tokens,
};
