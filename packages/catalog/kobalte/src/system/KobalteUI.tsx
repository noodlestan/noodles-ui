import { Component, JSX } from 'solid-js';

type Props = {
    children?: JSX.Element;
};

export const KobalteUI: Component<Props> = props => {
    return <>{props.children}</>;
};
