import { MixinResource } from '@noodles-ui/core-types';
import { MixinContext, ProjectContext } from '@noodles-ui/support-types';

import { addMixin } from './addMixin';

export const loadMixin = (
    project: ProjectContext,
    context: MixinContext,
): MixinResource | undefined => {
    const { resource: mixin } = context;
    const entity = structuredClone(mixin);
    return addMixin(project, context, entity);
};
