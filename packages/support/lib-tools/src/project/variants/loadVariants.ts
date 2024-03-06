import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../context/newPublicItemContext';

import { loadVariant } from './loadVariant';

export const loadVariants = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.variants.forEach(variant => {
        const context = newPublicItemContext(variant);
        loadVariant(project, context);
    });
};
