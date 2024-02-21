import { Component, JSX, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type SurfaceProps = {
    tag?: string;
    onClick?: () => void;
    onTap?: () => void;
    disabled?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<SurfaceProps, 'tag'> = {
    tag: 'div',
};

export const Surface: Component<SurfaceProps & JSX.HTMLAttributes<HTMLDivElement>> = props => {
    const [isActive, setIsActive] = createSignal(false);

    const handleFocus: JSX.FocusEventHandler<HTMLDivElement, FocusEvent> = ev => {
        setIsActive(true);
        typeof props.onFocus === 'function' && props.onFocus(ev);
    };

    const handleBlur: JSX.FocusEventHandler<HTMLDivElement, FocusEvent> = ev => {
        setIsActive(false);
        typeof props.onBlur === 'function' && props.onBlur(ev);
    };

    const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = ev => {
        if (ev.key === 'Enter') {
            props.onTap?.();
        } else {
            typeof props.onKeyDown === 'function' && props.onKeyDown(ev);
        }
    };

    const handleKeyPress: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = ev => {
        if (!props.onTap && ev.key === 'Enter') {
            props.onClick?.();
        } else {
            typeof props.onKeyPress === 'function' && props.onKeyPress(ev);
        }
    };

    const tabindex = () => (props.onClick || props.onTap ? 0 : undefined);
    const tag = () => props.tag || defaultProps.tag;

    return (
        <Dynamic
            component={tag()}
            onClick={props.onClick}
            onMouseDown={props.onTap}
            onTouchStart={props.onTap}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabindex={tabindex()}
            classList={props.classList}
            data-is-interactive={!!tabindex()}
            data-is-active={isActive()}
            data-is-disabled={props.disabled}
        >
            {props.children}
        </Dynamic>
    );
};
