import { ProjectContext } from '../types/projects';

import { isResourceFile } from './resources/isResourceFile';

export const getProjectFilenamesWatchlist = (project: ProjectContext): string[] => {
    return (
        project.build.program
            .getSourceFiles()
            .filter(file => isResourceFile(file.fileName))
            // .map(f => f.fileName.replace('.d.', '.').replace('/dist/', '/src/'));
            .map(f => f.fileName)
    );
};
