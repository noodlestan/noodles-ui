import { Component, JSX, Show } from 'solid-js';

type PluralProps = {
    count: number;
    children: JSX.Element;
};

export const Plural: Component<PluralProps> = props => {
    return (
        <>
            {props.children}
            <Show when={props.count !== 1}>s</Show>
        </>
    );
};
