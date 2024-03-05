import {
    ComponentOwnResource,
    ComponentResource,
    LocalPropResource,
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantResource,
} from '@noodles-ui/core-types';
import { ExtendWithParams } from '@noodles-ui/core-types/src/primitives/utils';

import { ComponentContext, ProjectContext } from '../../../types/projects';
import { newContextResourceWithConsumer } from '../../context/newContextResourceWithConsumer';
import { getResourceKey } from '../../resources/getResourceKey';
import { getResourceTypedKey } from '../../resources/getResourceTypedKey';
import { resolveExtendWithParams } from '../../resources/resolveExtendWithParams';
import { loadVariant } from '../../variants/loadVariant';
import { isVariantExtendResource } from '../../variants/private/isVariantExtendResource';
import { isVariantInlineReferenceResource } from '../../variants/private/isVariantInlineReferenceResource';

type Value = string | boolean | number | undefined;

type Params = {
    [key: string]: Params | Value;
};

type Props = {
    [name: string]: LocalPropResource;
};

const loadReferenceProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    variantReference: VariantInlineReferenceResource,
): LocalPropResource => {
    const newContext = newContextResourceWithConsumer<VariantResource, ComponentResource>(
        context,
        variantReference.reference,
        component,
    );
    loadVariant(project, newContext);
    context.consumes.add(getResourceTypedKey(variantReference));

    return variantReference;
};

const extendVariantExtends = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    extend: ExtendWithParams<VariantResource, Params>,
): { parent: VariantResource; params: Params } | undefined => {
    const { parent, params } = resolveExtendWithParams<VariantResource>(extend);
    const parentIsExtend = isVariantExtendResource(parent);
    if (parentIsExtend) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const actualParent = resolveVariantExtends(project, context, component, parentIsExtend);

        if (!actualParent) {
            return;
        }

        return { parent: actualParent, params };
    }
    return { parent, params };
};

const resolveVariantExtends = (
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

const loadExtendVariantProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    variant: VariantInlineExtendResource,
): LocalPropResource | undefined => {
    const { parent } = resolveExtendWithParams<VariantResource>(variant.extend);
    if (!parent.composable) {
        const key = getResourceKey(variant);
        project.addDiagnostic(
            component,
            `Could not extend variant "${key}" because it is not composable.`,
        );
        return;
    }
    return resolveVariantExtends(project, context, component, variant);
};

function loadProp(
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    prop: LocalPropResource,
): LocalPropResource | undefined {
    const variantExtends = isVariantExtendResource(prop);
    if (variantExtends) {
        return loadExtendVariantProp(project, context, component, variantExtends);
    }

    const variantReference = isVariantInlineReferenceResource(prop);
    if (variantReference) {
        return loadReferenceProp(project, context, component, variantReference);
    }

    return prop;
}

export const loadComponentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    props: Props,
): Props => {
    const loadedProps: Props = {};
    for (const key in props) {
        const prop = loadProp(project, context, component, props[key]);
        if (prop) {
            loadedProps[key] = prop;
        }
    }
    return loadedProps;
};
