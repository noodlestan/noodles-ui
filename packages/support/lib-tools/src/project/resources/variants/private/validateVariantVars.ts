import { VariantEntity, VariantInlineExtendResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const validateVariantVars = (
    project: ProjectContext,
    variant: VariantEntity | VariantInlineExtendResource,
): boolean => {
    const missingVars = variant.params?.filter(param => {
        const isMissingVar = !variant.vars || !(param in variant.vars);
        if (isMissingVar) {
            const variantKey = getResourceKey(variant);
            project.addError(
                variant,
                `A param for "${param}" was not supplied while creating variant from "${variantKey}".`,
            );
        }
        return isMissingVar;
    });
    return !missingVars?.length;
};
