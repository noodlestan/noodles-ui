import {
    VariantEntity,
    VariantInlineExtendResource,
    VariantOwnResource,
    VariantResource,
    VariantVars,
} from '@noodles-ui/core-types';
import { NUI, ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { getResourceKey } from '../getters/getResourceKey';

import { isVariantExtendResource } from './getters/isVariantExtendResource';
import { isVariantOwnResource } from './getters/isVariantOwnResource';
import { addVariant } from './private/addVariant';
import { extendVariantExtends } from './private/extendVariantExtends';
import { loadVariantMixin } from './private/loadVariantMixin';
import { loadVariantTokens } from './private/loadVariantTokens';

const loadVariantOwnResource = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantOwnResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const actualVars = { ...variant.vars, ...vars };

    const actualMixin = loadVariantMixin(project, context, variant);
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
        loadVariantTokens(project, context, entity);
    }

    return addVariant(project, context, entity);
};

const loadExtendedVariant = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
): VariantEntity | undefined => {
    const newContext = newResourceContextWithConsumer<VariantResource>(
        context,
        extendVariant.extend,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadVariant(project, newContext) as VariantEntity;
};

const loadVariantExtend = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const parent = loadExtendedVariant(project, context, extendVariant);
    if (!parent) {
        const name = getResourceKey(extendVariant);
        project.addError(extendVariant, `Could not load extended variant "${name}".`);
        return;
    }

    const entity = extendVariantExtends(project, context, extendVariant, parent, vars);
    if (!entity) {
        project.addError(extendVariant, 'Could not load variant');
        return;
    }

    if (context.public) {
        loadVariantTokens(project, context, entity);
    }

    return addVariant(project, context, entity);
};

export const loadVariant = (
    project: ProjectContext,
    context: VariantContext,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const { resource } = context;

    const variantExtend = isVariantExtendResource(resource);
    if (variantExtend) {
        return loadVariantExtend(project, context, variantExtend, vars);
    }

    const variant = isVariantOwnResource(resource);
    if (variant) {
        return loadVariantOwnResource(project, context, variant, vars);
    }

    throw new Error('Type error: could not match variant resource by shape');
};
