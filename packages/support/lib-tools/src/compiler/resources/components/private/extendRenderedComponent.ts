import {
    ComponentImportPartResource,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';
import { CompilerContext, ComponentContext } from '@noodles-ui/support-types';

import { mergeProps } from './mergeProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendRenderedComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    part: ComponentImportPartResource,
): ComponentOwnResource | undefined => {
    const { name, module, use, render, vars } = component;

    const actualProps = mergeProps(compiler, context, component, part.props || {});

    return {
        name,
        module,
        type: 'component',
        props: actualProps,
        use,
        render,
        vars: { ...part.vars, ...vars },
    };
};
