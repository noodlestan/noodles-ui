import { ProjectResource, VariantResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';
import { newResourceContextPublic } from '../context/newResourceContextPublic';

import { loadVariant } from './loadVariant';

export const loadVariants = (project: ProjectContext, resource: ProjectResource): void => {
    const { variants } = resource.entities;
    if (!variants.length) {
        logMessage('! no variants loaded');
    }
    variants.forEach(variant => {
        const context = newResourceContextPublic<VariantResource>(variant);
        loadVariant(project, context);
    });
};
