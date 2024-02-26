import { Component, JSX } from 'solid-js';

type Props = {
    num: number;
    children?: JSX.Element;
};

export const Foo: Component<Props> = props => {
    return (
        <div>
            {props.num}
            <hr />
            {props.children}
        </div>
    );
};
