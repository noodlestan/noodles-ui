import { ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadMixin } from './loadMixin';

export const loadMixins = (compiler: CompilerContext, project: ProjectResource): void => {
    const { mixins } = project.resources;
    mixins.forEach(mixin => {
        const context = newResourceContextPublic(mixin);
        loadMixin(compiler, context);
    });
};
