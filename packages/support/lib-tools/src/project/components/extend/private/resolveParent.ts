import { ComponentExtendResource, ComponentResource, ExtendParams } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { resolveExtendWithParams } from '../../../resources/resolveExtendWithParams';
import { extendComponent } from '../extendComponent';
import { isComponentExtendResource } from '../isComponentExtendResource';

export const resolveParent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): { parent: ComponentResource; params: ExtendParams } | undefined => {
    const { parent, params } = resolveExtendWithParams<ComponentResource>(component.extend);
    const componentExtends = isComponentExtendResource(parent);
    // TODO handle critical failure mode infinite recursion
    if (componentExtends) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const extended = extendComponent(project, context, componentExtends);
        if (!extended) {
            return undefined;
        }
        return {
            parent: extended,
            params,
        };
    }
    return { parent, params };
};
