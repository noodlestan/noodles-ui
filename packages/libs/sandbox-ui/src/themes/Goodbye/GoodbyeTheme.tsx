import { Theme } from '@noodles-ui/core-services';
import { Component } from 'solid-js';

import { GoodbyeTeamResource } from './GoodbyeTheme.nui';

import '../../generated/theme.Goodbye.css';

const c: Component = () => <></>;

export const GoodByeTheme: Theme = { component: c, ...GoodbyeTeamResource };
