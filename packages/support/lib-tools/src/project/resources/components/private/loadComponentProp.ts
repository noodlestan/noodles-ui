import {
    ComponentOwnResource,
    LocalPropResource,
    PropEntity,
    PropOwnResource,
    PropVariantEntity,
    PropVariantReference,
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { getResourceTypedKey } from '../../getters/getResourceTypedKey';
import { loadVariant } from '../../variants/loadVariant';

import { isVariantInlineExtendResourceProp } from './getters/isVariantInlineExtendResourceProp';
import { isVariantInlineProp } from './getters/isVariantInlineProp';
import { isVariantInlineReferenceResourceProp } from './getters/isVariantInlineReferenceResourceProp';

const loadVariantInlineProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    inlineVariant: VariantInlineResource,
): PropVariantEntity | undefined => {
    const newResource = { ...structuredClone(inlineVariant), module: component.module };
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(project, newContext, component.vars);
    if (!variant) {
        project.addError(
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
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    extendVariant: VariantInlineExtendResource,
): PropVariantEntity | undefined => {
    const newResource = { ...structuredClone(extendVariant), module: component.module };
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(project, newContext, component.vars);
    if (!variant) {
        project.addError(
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
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    variantReference: VariantInlineReferenceResource,
): PropVariantReference | undefined => {
    const newResource = structuredClone(variantReference.reference);
    const newContext = newResourceContextPublicWithConsumer<VariantResource>(context, newResource);

    const variant = loadVariant(project, newContext);
    if (!variant) {
        project.addError(
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
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    prop: LocalPropResource,
): PropEntity | undefined => {
    const variant = isVariantInlineProp(prop);
    if (variant) {
        return loadVariantInlineProp(project, context, component, key, variant);
    }

    const variantExtends = isVariantInlineExtendResourceProp(prop);
    if (variantExtends) {
        return loadVariantExtendProp(project, context, component, key, variantExtends);
    }

    const variantReference = isVariantInlineReferenceResourceProp(prop);
    if (variantReference) {
        return loadVariantReferenceProp(project, context, component, key, variantReference);
    }

    const { type = 'prop', name = key, module = component.module } = prop as PropOwnResource;

    return {
        ...prop,
        type,
        name,
        module,
    };
};
