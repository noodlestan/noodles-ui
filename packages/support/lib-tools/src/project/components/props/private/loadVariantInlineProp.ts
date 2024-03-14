import {
    ComponentOwnResource,
    PropVariantInstance,
    VariantInlineResource,
    VariantInstance,
    VariantResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { newContextPublicResourceWithConsumer } from '../../../context/newContextPublicResourceWithConsumer';
import { getResourceTypedKey } from '../../../resources/getResourceTypedKey';
import { loadVariant } from '../../../variants/loadVariant';

export const loadVariantInlineProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    key: string,
    inlineVariant: VariantInlineResource,
): PropVariantInstance | undefined => {
    const newResource = { ...structuredClone(inlineVariant), module: component.module };
    const newContext = newContextPublicResourceWithConsumer<VariantResource, VariantInstance>(
        context,
        newResource,
    );

    const variant = loadVariant(project, newContext);
    if (!variant) {
        project.addDiagnostic(
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
