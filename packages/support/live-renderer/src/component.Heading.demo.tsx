import { Component } from 'solid-js';

import { Heading, HeadingProps } from '../../../libs/lab-ui/src';

type DemoProps = {
    children: string;
};

const defaultProps: HeadingProps = {
    children: 'Lorem ipsum',
    variant: 'large',
    tag: 'h1',
    level: '1',
};

export const DemoHeading: Component<DemoProps> = props => {
    const actualProps = Object.assign({}, defaultProps, props);
    return <Heading {...actualProps} />;
};
