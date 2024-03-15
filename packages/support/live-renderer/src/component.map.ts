import { Component } from 'solid-js';

import { DemoHeading } from './component.Heading.demo';
import { DemoText } from './component.Text.demo';

export const componentDemoMap: Record<string, Component<never>> = {
    '@noodles-ui/lab-ui/Text': DemoText,
    '@noodles-ui/lab-ui/Heading': DemoHeading,
};
