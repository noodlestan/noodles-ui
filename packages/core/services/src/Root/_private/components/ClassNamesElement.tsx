import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

// import { colourSchemeClassList } from '../functions/colourSchemeClassList';
import { surfaceClassList } from '../../functions/contextClassList';

export type ClassNamesElementProps = JSX.HTMLAttributes<HTMLDivElement> & {
    tag?: string;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};
const defaultProps: Pick<ClassNamesElementProps, 'tag'> = {
    tag: 'div',
};
export const ClassNamesElement: Component<ClassNamesElementProps> = props => {
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        ...surfaceClassList(),
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
