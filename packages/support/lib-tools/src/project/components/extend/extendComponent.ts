import {
    ComponentExtendResource,
    ComponentOwnInstance,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { getRenderedProps } from './private/getRenderedProps';
import { mergeProps } from './private/mergeProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentOwnInstance,
): ComponentOwnResource | undefined => {
    const { module, name, use } = component;

    const actualName = name || parent.name;
    if (!actualName) {
        project.addDiagnostic(component, 'Empty component name');
        return;
    }

    const render = parent.render;
    const renderedProps = getRenderedProps(parent);
    const parentProps = { ...renderedProps, ...parent.props };

    const actualProps = mergeProps(project, context, component, parentProps);
    const actualUses = (parent.use || []).concat(use || []);

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        use: actualUses,
        render,
    };
};
