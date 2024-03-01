import { ProjectContext } from '../types/projects';

import { formatFileNameRelativeToProject } from './formatFileNameRelativeToProject';
import { logError } from './logError';
import { logMessage } from './logMessage';
import { logSuccess } from './logSuccess';

export const logBuildOutcome = (project: ProjectContext): void => {
    const { build } = project;
    const { success, diagnostics } = build;

    if (success) {
        logSuccess('TS build success');
        return;
    }

    const files = diagnostics.reduce((acc, item) => {
        if (item.file) {
            acc.add(item.file.fileName);
        }
        return acc;
    }, new Set<string>());
    logError('TS build errors', `(${diagnostics.length} errors in ${files.size} files)`);
    Array.from(files.values()).forEach(file =>
        logMessage(' - ', formatFileNameRelativeToProject(project.build.modules, file, true)),
    );
    console.info(' ');
};
