import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (compiler: CompilerContext): void => {
    const { surfaces = [] } = compiler.project.resources;
    surfaces.forEach(surface => {
        const context = newResourceContextPublic(surface);
        loadSurface(compiler, context);
    });
};
