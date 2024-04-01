import { SurfaceContext } from '@noodles-ui/core-entities';

import { CompilerContext } from '../../types';

import { addSurface } from './private/addSurface';

export const loadSurface = (compiler: CompilerContext, context: SurfaceContext): void => {
    const { resource: surface } = context;
    const entity = structuredClone(surface);
    addSurface(compiler, context, entity);
};
