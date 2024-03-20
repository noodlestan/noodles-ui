import { Component, JSX } from 'solid-js';

import { Text, TextProps } from '../../../libs/lab-ui/src';

type DemoProps = {
    children: JSX.Element;
};

const defaultProps: TextProps = {
    children: 'Lorem ipsum',
    variant: 'large',
    tag: 'p',
};

export const DemoText: Component<DemoProps> = props => {
    const actualProps = Object.assign({}, defaultProps, props);
    return <Text {...actualProps} />;
};
