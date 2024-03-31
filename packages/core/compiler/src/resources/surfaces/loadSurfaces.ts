import { ProjectResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (compiler: CompilerContext, resource: ProjectResource): void => {
    const { surfaces } = resource.resources;
    surfaces.forEach(surface => {
        const context = newResourceContextPublic(surface);
        loadSurface(compiler, context);
    });
};
