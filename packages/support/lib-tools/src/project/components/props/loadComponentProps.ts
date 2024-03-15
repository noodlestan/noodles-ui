import {
    ComponentEntityProps,
    ComponentOwnResource,
    ComponentPropsResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { loadComponentProp } from './private/loadComponentProp';

export const loadComponentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    props: ComponentPropsResource,
): ComponentEntityProps => {
    const loadedProps: ComponentEntityProps = {};
    for (const key in props) {
        const prop = loadComponentProp(project, context, component, key, props[key]);
        if (prop) {
            loadedProps[key] = prop;
        }
    }
    return loadedProps;
};
