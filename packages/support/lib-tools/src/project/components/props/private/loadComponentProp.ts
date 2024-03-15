import {
    ComponentOwnResource,
    LocalPropResource,
    PropEntity,
    PropOwnResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { isVariantInline } from '../../../variants/isVariantInline';
import { isVariantInlineExtendResource } from '../../../variants/isVariantInlineExtendResource';
import { isVariantInlineReferenceResource } from '../../../variants/isVariantInlineReferenceResource';

import { loadReferenceProp } from './loadReferenceProp';
import { loadVariantExtendProp } from './loadVariantExtendProp';
import { loadVariantInlineProp } from './loadVariantInlineProp';

export const loadComponentProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    prop: LocalPropResource,
): PropEntity | undefined => {
    const variant = isVariantInline(prop);
    if (variant) {
        return loadVariantInlineProp(project, context, component, key, variant);
    }

    const variantExtends = isVariantInlineExtendResource(prop);
    if (variantExtends) {
        return loadVariantExtendProp(project, context, component, key, variantExtends);
    }

    const variantReference = isVariantInlineReferenceResource(prop);
    if (variantReference) {
        return loadReferenceProp(project, context, component, key, variantReference);
    }

    const { type = 'prop', name = key, module = component.module } = prop as PropOwnResource;

    return {
        ...prop,
        type,
        name,
        module,
    };
};
