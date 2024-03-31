import { ProjectResource, VariantResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadVariant } from './loadVariant';

export const loadVariants = (compiler: CompilerContext, project: ProjectResource): void => {
    const { variants } = project.resources;

    variants.forEach(variant => {
        const context = newResourceContextPublic<VariantResource>(variant);
        loadVariant(compiler, context);
    });
};
