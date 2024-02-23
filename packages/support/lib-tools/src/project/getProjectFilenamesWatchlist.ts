import { isResourceFile } from '../resources/isResourceFile';
import { ProjectContext } from '../types/projects';

export const getProjectFilenamesWatchlist = (project: ProjectContext): string[] => {
    const filenames = project.build.program
        .getSourceFiles()
        .filter(file => isResourceFile(file.fileName))
        // .map(f => f.fileName.replace('.d.', '.').replace('/dist/', '/src/'));
        .map(f => f.fileName);

    return [project.projectFile, ...filenames];
};
