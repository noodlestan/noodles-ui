import {
    ComponentExtendResource,
    ComponentOwnEntity,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { getRenderedProps } from '../../../../entities/component/getters/getRenderedProps';

import { mergeProps } from './mergeProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentOwnEntity,
): ComponentOwnResource | undefined => {
    const { module, name, use, vars = {} } = component;

    const actualName = name || parent.name;
    if (!actualName) {
        project.addError(component, 'Empty component name');
        return;
    }

    const render = parent.render;
    const renderedProps = getRenderedProps(parent);
    const parentProps = { ...renderedProps, ...parent.props };
    const parentVars = parent.vars;

    const actualProps = mergeProps(project, context, component, parentProps);
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
