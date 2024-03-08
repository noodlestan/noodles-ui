import {
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantInstance,
    VariantResource,
} from '@noodles-ui/core-types';

import { ProjectContext, VariantContext } from '../../types/projects';
import { newContextResourceWithConsumer } from '../context/newContextResourceWithConsumer';

import { addVariant } from './addVariant';
import { isVariantInline } from './isVariantInline';
import { isVariantInlineExtendResource } from './isVariantInlineExtendResource';
import { isVariantInlineReferenceResource } from './isVariantInlineReferenceResource';
import { extendVariantExtends } from './private/extendVariantExtends';

const loadExtendedVariant = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
): VariantInstance | undefined => {
    const newContext = newContextResourceWithConsumer<VariantResource, VariantInstance>(
        context,
        extendVariant.extend,
        extendVariant,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadVariant(project, newContext) as VariantInstance;
};

const loadVariantExtend = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
): VariantInstance | undefined => {
    const parent = loadExtendedVariant(project, context, extendVariant);
    if (!parent) {
        project.addDiagnostic(extendVariant, "Could not load variant's parent");
        return;
    }

    const instance = extendVariantExtends(project, context, extendVariant, parent);
    if (!instance) {
        project.addDiagnostic(extendVariant, 'Could not load variant');
        return;
    }

    return addVariant(project, { ...context, instance });
};

const loadVariantReference = (
    project: ProjectContext,
    context: VariantContext,
    variantReference: VariantInlineReferenceResource,
): VariantInstance | undefined => {
    const instance = {
        ...structuredClone(variantReference.reference),
        type: 'variant',
        module: '',
    } as VariantInstance;

    return addVariant(project, { ...context, instance });
};

const loadInlineVariant = (
    project: ProjectContext,
    context: VariantContext,
    inlineVariant: VariantInlineResource,
): VariantInstance | undefined => {
    const instance = {
        ...structuredClone(inlineVariant),
        type: 'variant',
        module: '',
    } as VariantInstance;

    return addVariant(project, { ...context, instance });
};

export const loadVariant = (
    project: ProjectContext,
    context: VariantContext,
): VariantInstance | undefined => {
    const { resource } = context;

    const inlineVariant = isVariantInline(resource);
    if (inlineVariant) {
        return loadInlineVariant(project, context, inlineVariant);
    }

    const variantExtend = isVariantInlineExtendResource(resource);
    if (variantExtend) {
        return loadVariantExtend(project, context, variantExtend);
    }

    const variantReference = isVariantInlineReferenceResource(resource);
    if (variantReference) {
        return loadVariantReference(project, context, variantReference);
    }

    throw new Error('Type error: could not match variant resource by shape');
};
