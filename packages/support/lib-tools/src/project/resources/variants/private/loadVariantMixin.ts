import { MixinResource, VariantOwnResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { loadMixin } from '../../mixins/loadMixin';

export const loadVariantMixin = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantOwnResource,
): MixinResource | undefined => {
    if (variant.mixin) {
        const newResource = {
            ...structuredClone(variant.mixin),
            type: NUI.mixin as 'mixin',
            module: variant.module,
        };
        const newContext = newResourceContextPublicWithConsumer<MixinResource>(
            context,
            newResource,
        );
        return loadMixin(project, newContext);
    }
};
