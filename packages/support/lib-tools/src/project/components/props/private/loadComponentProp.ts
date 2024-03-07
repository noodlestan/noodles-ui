import { ComponentOwnResource, LocalPropResource } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { isVariantExtendResource } from '../../../variants/isVariantExtendResource';
import { isVariantInlineReferenceResource } from '../../../variants/isVariantInlineReferenceResource';
import { isPropVariant } from '../isVariantProp';

import { loadReferenceProp } from './loadReferenceProp';
import { loadVariantProp } from './loadVariantProp';

export const loadComponentProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    prop: LocalPropResource,
): LocalPropResource | undefined => {
    const variant = isPropVariant(prop);
    if (variant) {
        return loadVariantProp(project, context, component, variant);
    }

    const variantExtends = isVariantExtendResource(prop);
    if (variantExtends) {
        // TODO make this type more restrictive
        // at the loading props stage things are already resolved
        // the code already works like that but this exception remains
        // until the stricter typing (exclude VariantInlineExtend)
        // is removed
        project.addDiagnostic(component, 'Unexpected unresolved variant extension');
    }

    const variantReference = isVariantInlineReferenceResource(prop);
    if (variantReference) {
        return loadReferenceProp(project, context, component, variantReference);
    }

    return prop;
};
