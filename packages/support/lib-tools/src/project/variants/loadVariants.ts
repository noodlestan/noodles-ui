import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/functions/logInfo';
import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../themes/newPublicItemContext';

import { loadVariant } from './loadVariant';

export const loadVariants = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading variants...');

    projectResource.variants.forEach(variant => {
        const context = newPublicItemContext(variant);
        loadVariant(project, context);
    });

    console.info('');
};
