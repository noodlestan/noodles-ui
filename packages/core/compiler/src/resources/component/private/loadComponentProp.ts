import {
    ComponentContext,
    PropEntity,
    PropGenericEntity,
    PropVariantEntity,
    PropVariantReference,
} from '@noodles-ui/core-entities';
import {
    ComponentRenderResource,
    LocalPropResource,
    PropOwnResource,
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantResource,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadVariant } from '../../variant/loadVariant';

import { isVariantInlineExtendResourceProp } from './getters/isVariantInlineExtendResourceProp';
import { isVariantInlineProp } from './getters/isVariantInlineProp';
import { isVariantInlineReferenceResourceProp } from './getters/isVariantInlineReferenceResourceProp';

const loadVariantInlineProp = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    key: string,
    inlineVariant: VariantInlineResource,
): PropVariantEntity | undefined => {
    const newResource = { ...structuredClone(inlineVariant), module: component.module };
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(compiler, newContext, component.vars);
    if (!variant) {
        compiler.addError(
            component,
            `Could not load prop "${key}" because variant resolution failed.`,
        );
        return;
    }

    context.consumes.add(getResourceTypedKey(variant));

    return {
        type: 'prop',
        name: key,
        module: variant.module,
        defaultValue: variant.defaultValue,
        variant,
    };
};

const loadVariantExtendProp = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    key: string,
    extendVariant: VariantInlineExtendResource,
): PropVariantEntity | undefined => {
    const newResource = { ...structuredClone(extendVariant), module: component.module };
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(compiler, newContext, component.vars);
    if (!variant) {
        compiler.addError(
            component,
            `Could not load prop "${key}" because variant resolution failed.`,
        );
        return;
    }

    context.consumes.add(getResourceTypedKey(variant));

    return {
        type: 'prop',
        name: key,
        module: variant.module,
        defaultValue: variant.defaultValue,
        variant,
    };
};

const loadVariantReferenceProp = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    key: string,
    variantReference: VariantInlineReferenceResource,
): PropVariantReference | undefined => {
    const newResource = structuredClone(variantReference.reference);
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(compiler, newContext);
    if (!variant) {
        compiler.addError(
            component,
            `Could not load prop "${key}" because variant resolution failed.`,
        );
        return;
    }

    context.consumes.add(getResourceTypedKey(variantReference));

    return {
        type: 'prop',
        name: key,
        module: variant.module,
        defaultValue: variantReference.defaultValue || variant.defaultValue,
        reference: variant,
    };
};

export const loadComponentProp = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
    key: string,
    prop: LocalPropResource,
): PropEntity | undefined => {
    const variant = isVariantInlineProp(prop);
    if (variant) {
        return loadVariantInlineProp(compiler, context, component, key, variant);
    }

    const variantExtends = isVariantInlineExtendResourceProp(prop);
    if (variantExtends) {
        return loadVariantExtendProp(compiler, context, component, key, variantExtends);
    }

    const variantReference = isVariantInlineReferenceResourceProp(prop);
    if (variantReference) {
        return loadVariantReferenceProp(compiler, context, component, key, variantReference);
    }

    const { type = 'prop', name = key, module = component.module } = prop as PropOwnResource;

    return {
        ...prop,
        type,
        name,
        module,
    } as PropGenericEntity;
};
