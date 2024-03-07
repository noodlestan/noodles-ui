import {
    ComponentResource,
    ExtendParams,
    LocalPropOverrides,
    LocalPropResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { isVariantExtendResource } from '../../../variants/isVariantExtendResource';

import { extendPropWithParams } from './extendPropWithParams';

export const exposeProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    prop: LocalPropResource,
    parentParams: ExtendParams,
    overrides?: LocalPropOverrides,
): LocalPropResource | undefined => {
    const actualProp = extendPropWithParams(project, context, component, prop, parentParams);

    const propIsVariantExtendResource = isVariantExtendResource(prop);
    if (propIsVariantExtendResource) {
        if (!overrides?.name) {
            project.addDiagnostic(
                component,
                `Could not extend component with a variant prop because a local name for the variant was not provided.`,
            );
            return;
        }
    }
    return Object.assign({}, actualProp, overrides);
};
