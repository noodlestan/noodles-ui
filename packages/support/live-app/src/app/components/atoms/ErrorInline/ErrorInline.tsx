import { OctagonAlert } from 'lucide-solid';
import { Component, JSX } from 'solid-js';

import { Icon } from '../Icon';

import styles from './ErrorInline.module.scss';

type ErrorInlineProps = {
    children?: JSX.Element;
};

export const ErrorInline: Component<ErrorInlineProps> = props => {
    const classList = () => ({
        [styles.ErrorInline]: true,
    });

    return (
        <span classList={classList()}>
            <Icon size="s" icon={OctagonAlert} />
            {props.children}
        </span>
    );
};
