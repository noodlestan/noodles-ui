import { Component } from 'solid-js';

import { Heading, HeadingProps } from './component.Heading';

type DemoProps = {
    children: string;
};

const defaultProps: HeadingProps = {
    children: 'Lorem ipsum',
    variant: 'page',
    tag: 'h1',
    level: '1',
};

export const DemoHeading: Component<DemoProps> = props => {
    const actualProps = Object.assign({}, defaultProps, props);
    return <Heading {...actualProps} />;
};
