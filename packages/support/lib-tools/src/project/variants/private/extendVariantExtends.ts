import { VariantInlineExtendResource, VariantInstance } from '@noodles-ui/core-types';
import { ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../resources/getResourceKey';

export const extendVariantExtends = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    resolvedParent: VariantInstance,
): VariantInstance | undefined => {
    const { params } = extendVariant;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extend, vars, ...rest } = extendVariant;

    let missingVars = 0;
    params?.forEach(param => {
        if (!vars || !(param in vars)) {
            const variantKey = getResourceKey(parent);
            project.addDiagnostic(
                extendVariant,
                `A param for "${param}" was not supplied while creating variant from ${variantKey}`,
            );
            missingVars++;
        }
    });
    if (missingVars > 0) {
        return;
    }

    const actualVars = Object.assign({}, resolvedParent.vars, vars);

    return {
        ...resolvedParent,
        ...rest,
        type: 'variant',
        module: context.resource.module,
        mixin: resolvedParent.mixin,
        vars: actualVars,
    };
};
