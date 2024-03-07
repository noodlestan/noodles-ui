import { ComponentOwnResource, ComponentPropsResource } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';

import { loadComponentProp } from './private/loadComponentProp';

type Value = string | boolean | number | undefined;

export type Params = {
    [key: string]: Params | Value;
};

export const loadComponentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    props: ComponentPropsResource,
): ComponentPropsResource => {
    const loadedProps: ComponentPropsResource = {};
    for (const key in props) {
        const prop = loadComponentProp(project, context, component, props[key]);
        if (prop) {
            loadedProps[key] = prop;
        }
    }
    return loadedProps;
};
