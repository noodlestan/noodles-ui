import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type TextProps = {
    tag?: string;
    classList?: { [key: string]: boolean };
    style?: JSX.CSSProperties;
    children?: JSX.Element;
};

const defaultProps: Pick<TextProps, 'tag'> = {
    tag: 'p',
};

export const Text: Component<TextProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    return (
        <Dynamic component={tag()} classList={props.classList} style={props.style}>
            {props.children}
        </Dynamic>
    );
};
