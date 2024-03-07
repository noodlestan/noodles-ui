import {
    ComponentOwnResource,
    VariantInlineExtendResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { getResourceKey } from '../../../resources/getResourceKey';

import { extendVariantExtends } from './extendVariantExtends';

export const resolveVariantExtends = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    variant: VariantInlineExtendResource,
): VariantResource | undefined => {
    const { extend, ...rest } = variant;

    const resolved = extendVariantExtends(project, context, component, extend);
    if (!resolved) {
        return;
    }

    const { parent, params } = resolved;

    let missingParams = 0;
    const vars = new Map<string, [string]>();
    parent.params?.forEach(param => {
        if (!(param in params)) {
            const variantKey = getResourceKey(parent);
            project.addDiagnostic(
                component,
                `A param for "${param}" was not supplied while creating variant from ${variantKey}`,
            );
            missingParams++;
        }
        vars.set(param, [params[param] as string]);
    });
    if (missingParams > 0) {
        return;
    }

    const ret = {
        type: 'variant',
        ...parent,
        module: component.module,
        ...rest,
        vars: Object.assign({}, parent.vars, Object.fromEntries(vars)),
    };

    return ret;
};
