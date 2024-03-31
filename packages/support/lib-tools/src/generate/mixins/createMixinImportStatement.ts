import { MixinInlineResource, MixinResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

export const createMixinImportStatement = (
    project: ProjectContext,
    mixin: MixinResource | MixinInlineResource,
): string => {
    return `@import '${mixin.source}';`;
};
