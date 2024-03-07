import {
    ComponentExtendResource,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';

import { mergeProps } from './private/mergeProps';
import { resolveParent } from './private/resolveParent';
import { resolveParentProps } from './private/resolveParentProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnResource | undefined => {
    const { module, name, use } = component;

    const resolved = resolveParent(project, context, component);
    if (!resolved) {
        project.addDiagnostic(
            component,
            'Could not extend component because parent resolution failed.',
        );
        return;
    }

    const { parent, params } = resolved;
    const actualName = name || parent.name;
    if (!actualName) {
        project.addDiagnostic(component, 'No name');
        return;
    }

    const parentProps = resolveParentProps(project, context, component, parent, params);
    const actualProps = mergeProps(project, context, component, parentProps, params);
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
