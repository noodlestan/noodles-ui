import { ProjectResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadMixin } from './loadMixin';

export const loadMixins = (compiler: CompilerContext, project: ProjectResource): void => {
    const { mixins } = project.resources;
    mixins.forEach(mixin => {
        const context = newResourceContextPublic(mixin);
        loadMixin(compiler, context);
    });
};
