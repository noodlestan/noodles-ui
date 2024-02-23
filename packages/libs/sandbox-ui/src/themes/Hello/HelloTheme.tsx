import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import { HelloTeamResource } from './HelloTheme.nui';

import '../../generated/theme.Hello.css';

const c: Component = () => <></>;

export const HelloTheme: Theme = { component: c, ...HelloTeamResource };
