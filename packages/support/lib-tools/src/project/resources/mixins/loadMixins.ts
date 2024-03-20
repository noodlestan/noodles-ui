import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadMixin } from './loadMixin';

export const loadMixins = (project: ProjectContext, resource: ProjectResource): void => {
    const { mixins } = resource.entities;
    mixins.forEach(mixin => {
        const context = newResourceContextPublic(mixin);
        loadMixin(project, context);
    });
};
