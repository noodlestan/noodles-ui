import { Component, JSX } from 'solid-js';

export type LayoutFlexProps = {
    direction: string;
    children?: JSX.Element;
    classList?: { [key: string]: boolean };
    style?: JSX.CSSProperties;
};

export const LayoutFlex: Component<LayoutFlexProps> = props => {
    const classList = () => ({});
    return <div classList={classList()}>{props.children}</div>;
};
