import { VariantEntity, VariantInlineExtendResource, VariantVars } from '@noodles-ui/core-types';
import { ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { filterOutDuplicates } from '../../../../util/array';

export const extendVariantExtends = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    resolvedParent: VariantEntity,
    overrideVars?: VariantVars,
): VariantEntity | undefined => {
    const { vars: extendedVars } = extendVariant.extend;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extend, vars: variantVars, ...rest } = extendVariant;
    const actualVars = { ...variantVars, ...extendedVars, ...overrideVars };
    const actualParams = [
        ...(extendVariant.extend.params || []),
        ...(extendVariant.params || []),
    ].filter(filterOutDuplicates);

    return {
        ...resolvedParent,
        ...rest,
        type: 'variant',
        module: context.resource.module,
        mixin: resolvedParent.mixin,
        params: actualParams,
        vars: actualVars,
    };
};
