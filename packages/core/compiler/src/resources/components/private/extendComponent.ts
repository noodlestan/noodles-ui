import { ComponentContext, ComponentOwnEntity, getRenderedProps } from '@noodles-ui/core-entities';
import { ComponentExtendResource, ComponentOwnResource } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

import { mergeProps } from './mergeProps';

export const extendComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentOwnEntity,
): ComponentOwnResource | undefined => {
    const { module, name, use, vars = {} } = component;

    const actualName = name || parent.name;
    if (!actualName) {
        compiler.addError(component, 'Empty component name');
        return;
    }

    const render = parent.render;
    const renderedProps = getRenderedProps(parent);
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
