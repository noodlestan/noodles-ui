import { ComponentContext, ComponentEntityProps } from '@noodles-ui/core-entities';
import { ComponentPropsResource, ComponentRenderResource } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../../types';

import { loadComponentProp } from './loadComponentProp';

export const loadComponentProps = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    props: ComponentPropsResource,
): ComponentEntityProps => {
    const loadedProps: ComponentEntityProps = {};
    for (const key in props) {
        const prop = loadComponentProp(compiler, context, component, key, props[key]);
        if (prop) {
            loadedProps[key] = prop;
        }
    }
    return loadedProps;
};
