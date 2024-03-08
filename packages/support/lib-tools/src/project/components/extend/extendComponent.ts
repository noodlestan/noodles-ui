import {
    ComponentExtendResource,
    ComponentOwnInstance,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';

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

    const actualProps = mergeProps(project, context, component, parent.props);
    const actualUses = (parent.use || []).concat(use || []);

    const render = parent.render;

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        use: actualUses,
        render,
    };
};
