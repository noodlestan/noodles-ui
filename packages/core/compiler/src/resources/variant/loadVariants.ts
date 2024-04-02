import { VariantResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadVariant } from './loadVariant';

export const loadVariants = (compiler: CompilerContext): void => {
    const { variants = [] } = compiler.project.resources;

    variants.forEach(variant => {
        const newContext = newResourceContextPublic<VariantResource>(variant);
        loadVariant(compiler, newContext);
    });
};
