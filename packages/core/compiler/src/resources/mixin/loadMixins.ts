import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadMixin } from './loadMixin';

export const loadMixins = (compiler: CompilerContext): void => {
    const { mixins = [] } = compiler.project.resources;
    mixins.forEach(mixin => {
        const context = newResourceContextPublic(mixin);
        loadMixin(compiler, context);
    });
};
