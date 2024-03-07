import {
    ComponentOwnResource,
    ComponentResource,
    LocalPropResource,
    VariantInlineReferenceResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { newContextResourceWithConsumer } from '../../../context/newContextResourceWithConsumer';
import { getResourceTypedKey } from '../../../resources/getResourceTypedKey';
import { loadVariant } from '../../../variants/loadVariant';

export const loadReferenceProp = (
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
