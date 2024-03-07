import { ComponentOwnResource, VariantResource } from '@noodles-ui/core-types';
import { ExtendWithParams } from '@noodles-ui/core-types/src/primitives/utils';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { resolveExtendWithParams } from '../../../resources/resolveExtendWithParams';
import { isVariantExtendResource } from '../../../variants/isVariantExtendResource';
import { Params } from '../loadComponentProps';

import { resolveVariantExtends } from './resolveVariantExtends';

export const extendVariantExtends = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    extend: ExtendWithParams<VariantResource, Params>,
): { parent: VariantResource; params: Params } | undefined => {
    const { parent, params } = resolveExtendWithParams<VariantResource>(extend);
    const parentIsExtend = isVariantExtendResource(parent);
    if (parentIsExtend) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const actualParent = resolveVariantExtends(project, context, component, parentIsExtend);

        if (!actualParent) {
            return;
        }

        return { parent: actualParent, params };
    }
    return { parent, params };
};
