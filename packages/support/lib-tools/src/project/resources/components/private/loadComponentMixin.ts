import { ComponentOwnResource, MixinResource } from '@noodles-ui/core-types';
import { ComponentContext, NUI, ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { loadMixin } from '../../mixins/loadMixin';

export const loadComponentMixin = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    mixinResource: MixinResource,
): MixinResource | undefined => {
    const newResource = {
        ...structuredClone(mixinResource),
        type: NUI.mixin as 'mixin',
    };
    const newContext = newResourceContextPublicWithConsumer<MixinResource>(context, newResource);

    const mixin = loadMixin(project, newContext);
    if (!mixin) {
        project.addError(
            component,
            `Could not load mixin "${mixinResource.name}" because resolution failed.`,
        );
        return;
    }

    return mixin;
};
