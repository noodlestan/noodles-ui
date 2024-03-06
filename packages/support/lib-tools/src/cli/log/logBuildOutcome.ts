import { ProjectContext } from '../../types/projects';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logSuccess } from '../logger/logSuccess';

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
