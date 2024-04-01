import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type HeadingLevel = '1' | '2' | '3' | '4';

export type HeadingProps = {
    level: HeadingLevel;
    tag?: string;
    children?: JSX.Element;
    classList?: { [key: string]: boolean };
    style?: JSX.CSSProperties;
};

const MAP_LEVEL_TO_TAG: Record<HeadingLevel, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
};

export const Heading: Component<HeadingProps> = props => {
    const tag = () => props.tag || MAP_LEVEL_TO_TAG[props.level];

    return (
        <Dynamic component={tag()} classList={props.classList} style={props.style}>
            {props.children}
        </Dynamic>
    );
};
