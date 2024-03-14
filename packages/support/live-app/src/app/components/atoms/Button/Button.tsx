import { Component, JSX } from 'solid-js';

import styles from './Button.module.css';

type ButtonProps = {
    children: JSX.Element;
    variant?: 'primary' | 'secondary';
    onClick: () => void;
};

const defaultProps: Pick<ButtonProps, 'variant'> = {
    variant: 'secondary',
};

export const Button: Component<ButtonProps> = props => {
    const variant = () => props.variant || defaultProps.variant;

    const classList = () => ({
        [styles.Button]: true,
        [styles[`Button-variant-${variant()}`]]: true,
    });

    return (
        // eslint-disable-next-line solid/reactivity
        <button classList={classList()} onClick={props.onClick}>
            {props.children}
        </button>
    );
};
