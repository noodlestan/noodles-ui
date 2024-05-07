import { NUI, VariantContext, VariantEntity } from '@noodles-ui/core-entities';
import {
    VariantInlineExtendResource,
    VariantOwnResource,
    VariantResource,
    VariantVars,
    getResourceKey,
    getResourceTypedKey,
    isVariantExtendResource,
    isVariantOwnResource,
} from '@noodles-ui/core-resources';

import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { CompilerContext } from '../../types';

import { addVariant } from './private/addVariant';
import { extendVariantExtends } from './private/extendVariantExtends';
import { loadVariantMixin } from './private/loadVariantMixin';
import { loadVariantTokens } from './private/loadVariantTokens';

const loadVariantOwnResource = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantOwnResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const actualVars = { ...variant.vars, ...vars };

    const actualMixin = loadVariantMixin(compiler, context, variant);
    if (actualMixin) {
        context.consumes.add(getResourceTypedKey(actualMixin));
    }
    const actualOptions = variant.options || [];
    const actualParams = [...(variant.params || []), ...(actualMixin?.params || [])];
    const actualTokens = [...(variant.tokens || []), ...(actualMixin?.tokens || [])];

    const entity: VariantEntity = {
        ...structuredClone(variant),
        type: NUI.variant as 'variant',
        options: actualOptions,
        mixin: actualMixin,
        params: actualParams,
        tokens: actualTokens,
        vars: actualVars,
    };

    if (context.public) {
        loadVariantTokens(compiler, context, entity);
    }

    return addVariant(compiler, context, entity);
};

const loadExtendedVariant = (
    compiler: CompilerContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
): VariantEntity | undefined => {
    const newContext = newResourceContextWithConsumer<VariantResource>(
        context,
        extendVariant.extend,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadVariant(compiler, newContext) as VariantEntity;
};

const loadVariantExtend = (
    compiler: CompilerContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const extendedVariant = loadExtendedVariant(compiler, context, extendVariant);
    if (!extendedVariant) {
        const name = getResourceKey(extendVariant);
        compiler.addError(extendVariant, `Could not load extended variant "${name}".`);
        return;
    }
    context.consumes.add(getResourceTypedKey(extendedVariant));

    const entity = extendVariantExtends(compiler, context, extendVariant, extendedVariant, vars);

    if (context.public) {
        loadVariantTokens(compiler, context, entity);
    }

    return addVariant(compiler, context, entity);
};

export const loadVariant = (
    compiler: CompilerContext,
    context: VariantContext,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const { resource } = context;

    const variantExtend = isVariantExtendResource(resource);
    if (variantExtend) {
        return loadVariantExtend(compiler, context, variantExtend, vars);
    }

    const variant = isVariantOwnResource(resource);
    if (variant) {
        return loadVariantOwnResource(compiler, context, variant, vars);
    }

    throw new Error('Type error: could not match variant resource by shape');
};
