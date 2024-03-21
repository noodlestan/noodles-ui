import {
    ComponentImportPartResource,
    ComponentOwnResource,
    LocalPropResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { mergeProps } from './mergeProps';

export type Props = {
    [name: string]: LocalPropResource;
};

export const extendRenderedComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    part: ComponentImportPartResource,
): ComponentOwnResource | undefined => {
    const { name, module, use, render, vars } = component;

    const actualProps = mergeProps(project, context, component, part.props || {});

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
