import {
    VariantEntity,
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantResource,
} from '@noodles-ui/core-types';
import { ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextWithConsumer } from '../context/newResourceContextWithConsumer';

import { addVariant } from './addVariant';
import { isVariantInline } from './isVariantInline';
import { isVariantInlineExtendResource } from './isVariantInlineExtendResource';
import { isVariantInlineReferenceResource } from './isVariantInlineReferenceResource';
import { extendVariantExtends } from './private/extendVariantExtends';

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
): VariantEntity | undefined => {
    const parent = loadExtendedVariant(project, context, extendVariant);
    if (!parent) {
        project.addDiagnostic(extendVariant, "Could not load variant's parent");
        return;
    }

    const entity = extendVariantExtends(project, context, extendVariant, parent);
    if (!entity) {
        project.addDiagnostic(extendVariant, 'Could not load variant');
        return;
    }

    return addVariant(project, context, entity);
};

const loadVariantReference = (
    project: ProjectContext,
    context: VariantContext,
    variantReference: VariantInlineReferenceResource,
): VariantEntity | undefined => {
    const entity = {
        ...structuredClone(variantReference.reference),
        type: 'variant',
        module: '',
    } as VariantEntity;

    return addVariant(project, context, entity);
};

const loadInlineVariant = (
    project: ProjectContext,
    context: VariantContext,
    inlineVariant: VariantInlineResource,
): VariantEntity | undefined => {
    const entity = {
        ...structuredClone(inlineVariant),
        type: 'variant',
    } as VariantEntity;

    return addVariant(project, context, entity);
};

export const loadVariant = (
    project: ProjectContext,
    context: VariantContext,
): VariantEntity | undefined => {
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
