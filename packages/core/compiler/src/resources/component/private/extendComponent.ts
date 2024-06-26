import {
    ComponentContext,
    ComponentRenderEntity,
    getComponentRenderedProps,
} from '@noodles-ui/core-entities';
import { ComponentExtendResource, ComponentRenderResource } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

import { mergeProps } from './mergeProps';

export const extendComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentRenderEntity,
): ComponentRenderResource | undefined => {
    const { module, name, use, vars = {} } = component;

    const actualName = name || parent.name;
    if (!actualName) {
        compiler.addError(component, 'Empty component name');
        return;
    }

    const render = parent.render;
    const renderedProps = getComponentRenderedProps(parent);
    const parentProps = { ...renderedProps, ...parent.props };
    const parentVars = parent.vars;

    const actualProps = mergeProps(compiler, context, component, parentProps);
    const actualUses = (parent.use || []).concat(use || []);

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        use: actualUses,
        render,
        vars: { ...parentVars, ...vars },
    };
};
