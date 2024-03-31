import { ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (compiler: CompilerContext, resource: ProjectResource): void => {
    const { surfaces } = resource.resources;
    surfaces.forEach(surface => {
        const context = newResourceContextPublic(surface);
        loadSurface(compiler, context);
    });
};
