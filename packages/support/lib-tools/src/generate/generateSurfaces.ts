import { ProjectContext } from '@noodles-ui/support-types';

import { generateSurfacesIndex } from './surfaces/generateSurfacesIndex';

export const generateSurfaces = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    await generateSurfacesIndex(project, targetDir);
};
