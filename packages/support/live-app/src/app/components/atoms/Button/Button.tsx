import { Component, JSX } from 'solid-js';

import styles from './Button.module.css';

type ButtonProps = {
    children: JSX.Element;
    variant?: 'primary' | 'secondary';
    onClick: (ev: MouseEvent) => void;
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

    const handleClick = (ev: MouseEvent) => props.onClick?.(ev);

    return (
        <button classList={classList()} onClick={handleClick}>
            {props.children}
        </button>
    );
};
