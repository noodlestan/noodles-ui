import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

export const getProjectFilenamesWatchlist = (project: ProjectContext): string[] => {
    return Array.from(project.build.modules.values()).flatMap(
        module => module.filenames.map(filename => join(module.path, filename)),
        // .map(f => f.fileName.replace('.d.', '.').replace('/dist/', '/src/'));
        // .map(f => f.fileName),
    );
};
