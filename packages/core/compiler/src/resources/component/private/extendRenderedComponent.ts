import { ComponentContext } from '@noodles-ui/core-entities';
import {
    ComponentImportPartResource,
    ComponentRenderResource,
    LocalPropResource,
} from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

import { mergeProps } from './mergeProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendRenderedComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    part: ComponentImportPartResource,
): ComponentRenderResource | undefined => {
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
