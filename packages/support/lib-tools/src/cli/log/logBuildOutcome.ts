import { ProjectContext } from '../../types/projects';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logSuccess } from '../logger/logSuccess';

export const logBuildOutcome = (project: ProjectContext): void => {
    const { build } = project;
    const { success, diagnostics = [] } = build;

    if (success) {
        logSuccess('TS build success');
        return;
    }

    const uniqueFiles = diagnostics.reduce((acc, item) => {
        if (item.file) {
            acc.add(item.file.fileName);
        }
        return acc;
    }, new Set<string>());
    logError('TS build errors', `(${diagnostics.length} errors in ${uniqueFiles.size} files)`);
    const files = Array.from(uniqueFiles.values());
    files.forEach(file =>
        logMessage(' - ', formatFileNameRelativeToProject(project.build.modules, file, true)),
    );
    if (files.length) {
        console.info(' ');
    }
};
