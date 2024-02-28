import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';

import { addVariant } from './addVariant';

export const loadVariants = (project: ProjectContext, meta: ProjectResource): void => {
    logInfo('loading variants...');

    meta.variants.forEach(variant => {
        addVariant(project, variant, { public: true });
    });

    console.info('');
};
