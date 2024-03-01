import {
    ComponentOwnResource,
    ComponentResource,
    LocalPropResource,
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';
import { getResourceKey } from '../../resources/getResourceKey';
import { getResourceTypedKey } from '../../resources/getResourceTypedKey';
import { loadVariant } from '../../variants/loadVariant';
import { isVariantExtendResource } from '../../variants/private/isVariantExtendResource';
import { isVariantInlineReferenceResource } from '../../variants/private/isVariantInlineReferenceResource';
import { newContextResourceWithConsumer } from '../newContextResourceWithConsumer';
import { resolveResourceParent } from '../resolveResourceParent';

type Props = {
    [name: string]: LocalPropResource;
};

function loadReferenceProp(
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    variantReference: VariantInlineReferenceResource,
) {
    const newContext = newContextResourceWithConsumer<VariantResource, ComponentResource>(
        context,
        variantReference.reference,
        component,
    );
    loadVariant(project, newContext);
    context.consumes.add(getResourceTypedKey(variantReference));
}

function loadExtendVariantProp(
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    variantExtends: VariantInlineExtendResource,
) {
    const { parent } = resolveResourceParent<VariantResource>(variantExtends);
    if (!parent.composable) {
        const key = getResourceKey(variantExtends);
        project.addDiagnostic(
            component,
            `Can not extend variant "${key}" because it is not composable.`,
        );
    }
    // TODO resolve (nested) extension immediately
    // streamline further process of options, defaultOptions, etc...
    // TODO generate private instance of the variant (group, family, whatever it is called)
}

function loadProp(
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    prop: LocalPropResource,
) {
    const variantReference = isVariantInlineReferenceResource(prop);
    if (variantReference) {
        loadReferenceProp(project, context, component, variantReference);
    }

    const variantExtends = isVariantExtendResource(prop);
    if (variantExtends) {
        loadExtendVariantProp(project, context, component, variantExtends);
    }

    return prop;
}

export const loadComponentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    props: Props,
): Props => {
    for (const key in props) {
        props[key] = loadProp(project, context, component, props[key]);
    }
    return props;
};
