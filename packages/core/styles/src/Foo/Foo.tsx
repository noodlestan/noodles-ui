import { Component, JSX, createSignal } from 'solid-js';

import { sum } from './util';

type Props = {
    startAt: number;
    children?: JSX.Element;
};

export const Foo: Component<Props> = props => {
    const [num, setNum] = createSignal(0);

    return (
        <div>
            {num() + props.startAt}
            <button onClick={() => setNum(v => sum(v, 1))}>+1</button>
            <hr />
            {props.children}
        </div>
    );
};
