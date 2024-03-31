import { VariantEntity, VariantInlineExtendResource, VariantVars } from '@noodles-ui/core-types';
import { CompilerContext, VariantContext } from '@noodles-ui/support-types';

import { filterOutDuplicates } from '../../../../util/array';

export const extendVariantExtends = (
    compiler: CompilerContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    resolvedParent: VariantEntity,
    overrideVars?: VariantVars,
): VariantEntity | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { vars: parentVars, params: parentParams, tokens: parentTokens } = resolvedParent;
    const {
        vars: variantVars,
        params: variantParams,
        tokens: variantTokens,
        ...rest
    } = extendVariant;

    const actualParams = [...(variantParams || []), ...(parentParams || [])].filter(
        filterOutDuplicates,
    );
    const actualTokens = [...(variantTokens || []), ...(parentTokens || [])];
    const actualVars = { ...variantVars, ...parentVars, ...overrideVars };

    return {
        ...resolvedParent,
        ...rest,
        type: 'variant',
        module: context.resource.module,
        mixin: resolvedParent.mixin,
        params: actualParams,
        tokens: actualTokens,
        vars: actualVars,
    };
};
