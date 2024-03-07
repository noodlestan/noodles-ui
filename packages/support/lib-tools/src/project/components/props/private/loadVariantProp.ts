import {
    ComponentOwnResource,
    ComponentResource,
    LocalPropResource,
    VariantInlineResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { newContextResourceWithConsumer } from '../../../context/newContextResourceWithConsumer';
import { getResourceTypedKey } from '../../../resources/getResourceTypedKey';
import { loadVariant } from '../../../variants/loadVariant';

export const loadVariantProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    inlineVariant: VariantInlineResource,
): LocalPropResource | undefined => {
    const variant = { ...structuredClone(inlineVariant), module: component.module };
    const newContext = newContextResourceWithConsumer<VariantResource, ComponentResource>(
        context,
        variant,
        component,
    );
    loadVariant(project, newContext);
    context.consumes.add(getResourceTypedKey(variant));

    return inlineVariant;
};
