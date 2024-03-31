import { ProjectResource, VariantResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadVariant } from './loadVariant';

export const loadVariants = (context: CompilerContext, project: ProjectResource): void => {
    const { variants } = project.resources;

    variants.forEach(variant => {
        const newContext = newResourceContextPublic<VariantResource>(variant);
        loadVariant(context, newContext);
    });
};
