import { ProjectContext } from '@noodles-ui/support-types';

import { getBuildErrorMessage } from '../../project/program/getters/getBuildErrorMessage';
import { getBuildFilesWithErrors } from '../../project/program/getters/getBuildFilesWithErrors';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logSuccess } from '../logger/logSuccess';

export const logBuildOutcome = (project: ProjectContext): void => {
    const { build } = project;
    const { success } = build;

    if (success) {
        logSuccess('TS build success');
        return;
    }

    const message = getBuildErrorMessage(project.build);
    logError(message);

    const uniqueFiles = getBuildFilesWithErrors(project.build);
    const files = Array.from(uniqueFiles.values());
    files.forEach(file => logMessage(' - ', formatFileNameRelativeToProject(project, file, true)));
    if (files.length) {
        console.info(' ');
    }
};
