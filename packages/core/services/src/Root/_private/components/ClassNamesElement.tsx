import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

// import { colourSchemeClassList } from '../functions/colourSchemeClassList';
import { classListFromClassNames } from '../functions/classListFromClassNames';
import { surfaceClassNames } from '../functions/surfaceClassNames';
import { themeClassNames } from '../functions/themeClassNames';

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
        ...classListFromClassNames([...themeClassNames(), ...surfaceClassNames()]),
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
