import { SurfaceProvider, contextClassList } from '@noodles-ui/core-services';
import {
    Surface as SurfaceUnstyled,
    SurfaceProps as SurfaceUnstyledProps,
} from '@noodles-ui/core-unstyled';
import { Component, JSX } from 'solid-js';

import { surfaceClasslist } from './surfaceClassList';

export type SurfaceProps = SurfaceUnstyledProps & {
    variant: string;
    disabled?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const SurfaceElement = (props: SurfaceProps) => {
    const classList = () => ({
        ...props.classList,
        ...contextClassList(),
        ...surfaceClasslist(),
    });

    return (
        <SurfaceUnstyled {...props} classList={classList()}>
            {props.children}
        </SurfaceUnstyled>
    );
};

export const Surface: Component<SurfaceProps> = props => {
    return (
        <SurfaceProvider surface={props.variant} shallow>
            <SurfaceElement {...props} />
        </SurfaceProvider>
    );
};
