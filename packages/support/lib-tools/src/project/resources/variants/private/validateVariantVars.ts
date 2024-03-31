import { VariantEntity, VariantInlineExtendResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const validateVariantVars = (
    compiler: CompilerContext,
    variant: VariantEntity | VariantInlineExtendResource,
): boolean => {
    const missingVars = variant.params?.filter(param => {
        const isMissingVar = !variant.vars || !(param in variant.vars);
        if (isMissingVar) {
            const variantKey = getResourceKey(variant);
            compiler.addError(
                variant,
                `A param for "${param}" was not supplied while creating variant from "${variantKey}".`,
            );
        }
        return isMissingVar;
    });
    return !missingVars?.length;
};
