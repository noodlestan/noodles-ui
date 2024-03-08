import {
    ComponentOwnResource,
    PropVariantReference,
    VariantInlineReferenceResource,
    VariantInstance,
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
    key: string,
    variantReference: VariantInlineReferenceResource,
): PropVariantReference | undefined => {
    const newResource = structuredClone(variantReference.reference);
    const newContext = newContextResourceWithConsumer<VariantResource, VariantInstance>(
        context,
        newResource,
        component,
    );

    const variant = loadVariant(project, newContext);
    if (!variant) {
        project.addDiagnostic(
            component,
            `Could not load prop "${key}" because variant resolution failed.`,
        );
        return;
    }

    context.consumes.add(getResourceTypedKey(variantReference));

    return {
        type: 'prop',
        name: key,
        module: variant.module,
        defaultValue: variantReference.defaultValue || variant.defaultValue,
        reference: variant,
    };
};
