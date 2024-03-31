import { CompilerContext } from '@noodles-ui/support-types';

import { generateSurfacesIndex } from './surfaces/generateSurfacesIndex';

export const generateSurfaces = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    await generateSurfacesIndex(compiler, targetDir);
};
