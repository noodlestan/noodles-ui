import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

import { addVariant } from './addVariant';

export const loadVariants = (project: ProjectContext, meta: ProjectResource): void => {
    meta.variants.forEach(variant => {
        addVariant(variant, project, { public: true });
    });
};
