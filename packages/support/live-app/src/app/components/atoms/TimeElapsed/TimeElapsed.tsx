import { Component, createEffect, createSignal, onCleanup } from 'solid-js';

type TimeElapsedProps = {
    date?: Date;
};

const calc = (date: Date): number => {
    const delta = Date.now() - date.valueOf();
    return Math.round(delta / 100) / 10;
};

export const TimeElapsed: Component<TimeElapsedProps> = props => {
    const [ellapsed, setEllapsed] = createSignal<number>(0);

    createEffect(() => {
        if (props.date) {
            setEllapsed(calc(props.date));
        }
    });

    const timer = setInterval(() => {
        if (props.date) {
            setEllapsed(calc(props.date));
        }
    }, 200);

    onCleanup(() => clearInterval(timer));

    return <>{ellapsed()}s</>;
};
