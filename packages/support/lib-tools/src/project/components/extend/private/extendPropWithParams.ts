import {
    ComponentResource,
    ExtendParams,
    LocalPropResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { resolveExtendWithParams } from '../../../resources/resolveExtendWithParams';
import { isVariantExtendResource } from '../../../variants/isVariantExtendResource';

export const extendPropWithParams = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    prop: LocalPropResource,
    parentParams: ExtendParams,
): LocalPropResource => {
    const propIsVariantExtendResource = isVariantExtendResource(prop);
    if (propIsVariantExtendResource) {
        const { parent, params } = resolveExtendWithParams<VariantResource>(
            propIsVariantExtendResource.extend,
        );
        const actualParams = structuredClone(params);
        for (const key in params) {
            // TODO properly pass params up the extend chain ... left incomplete because it looked like a poor tool
            if ((params[key] as string) === '#{}') {
                actualParams[key] = parentParams[key];
            }
        }
        return { ...prop, extend: [parent, actualParams] };
    } else {
        return prop;
    }
};
