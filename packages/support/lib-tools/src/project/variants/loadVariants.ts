import { ProjectResource, VariantInstance, VariantResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';
import { newContextPublicResource } from '../context/newContextPublicResource';

import { loadVariant } from './loadVariant';

export const loadVariants = (project: ProjectContext, projectResource: ProjectResource): void => {
    if (!projectResource.variants.length) {
        logMessage('! no variants loaded');
    }
    projectResource.variants.forEach(variant => {
        const context = newContextPublicResource<VariantResource, VariantInstance>(variant);
        loadVariant(project, context);
    });
};
