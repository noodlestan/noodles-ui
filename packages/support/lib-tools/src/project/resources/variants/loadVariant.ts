import {
    MixinResource,
    VariantEntity,
    VariantInlineExtendResource,
    VariantOwnResource,
    VariantResource,
    VariantVars,
} from '@noodles-ui/core-types';
import { NUI, ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../context/newResourceContextPublicWithConsumer';
import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { loadMixin } from '../mixins/loadMixin';

import { addVariant } from './addVariant';
import { isVariantExtendResource } from './getters/isVariantExtendResource';
import { isVariantOwnResource } from './getters/isVariantOwnResource';
import { extendVariantExtends } from './private/extendVariantExtends';

const loadVariantOwnResource = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantOwnResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const entity = {
        ...structuredClone(variant),
        type: NUI.variant as 'variant',
        vars: Object.assign({}, variant.vars, vars),
    };

    if (variant.mixin) {
        const newResource = {
            ...structuredClone(variant.mixin),
            type: NUI.mixin as 'mixin',
            module: entity.module,
        };
        const newContext = newResourceContextPublicWithConsumer<MixinResource>(
            context,
            newResource,
        );
        entity.mixin = loadMixin(project, newContext);
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
        project.addDiagnostic(extendVariant, "Could not load variant's parent");
        return;
    }

    const entity = extendVariantExtends(project, context, extendVariant, parent, vars);
    if (!entity) {
        project.addDiagnostic(extendVariant, 'Could not load variant');
        return;
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