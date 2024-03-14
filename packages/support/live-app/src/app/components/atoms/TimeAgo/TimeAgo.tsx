import { createDate, createTimeAgo } from '@solid-primitives/date';
import { Component, createRenderEffect, onCleanup } from 'solid-js';

type TimeAgoProps = {
    date?: string | undefined;
};

export const TimeAgo: Component<TimeAgoProps> = props => {
    const [myDate, setMyDate] = createDate(new Date());
    const [timeago] = createTimeAgo(myDate);

    createRenderEffect(() => {
        if (props.date) {
            setMyDate(props.date);
        }
    });

    const timer = setInterval(() => {
        if (props.date) {
            setMyDate(props.date);
        }
    }, 10 * 1000);

    onCleanup(() => clearInterval(timer));

    return <>{timeago()}</>;
};
