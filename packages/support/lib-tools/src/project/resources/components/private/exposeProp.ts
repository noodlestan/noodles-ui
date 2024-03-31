import { ComponentResource, LocalPropOverrides, LocalPropResource } from '@noodles-ui/core-types';
import { CompilerContext, ComponentContext } from '@noodles-ui/support-types';

import { isVariantInlineExtendResourceProp } from './getters/isVariantInlineExtendResourceProp';

export const exposeProp = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentResource,
    prop: LocalPropResource,
    overrides?: LocalPropOverrides,
): LocalPropResource | undefined => {
    const actualProp = structuredClone(prop);

    const propIsVariantExtendResource = isVariantInlineExtendResourceProp(prop);
    if (propIsVariantExtendResource) {
        if (!overrides?.name) {
            compiler.addError(
                component,
                `Could not extend component with a variant prop because a local name for the variant was not provided.`,
            );
            return;
        }
    }
    return Object.assign({}, actualProp, overrides);
};
