import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { deserializeSnapshot } from './private/deserializeSnapshot';
import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { loadProjectSnapshotFile } from './private/loadProjectSnapshotFile';

export const loadProjectSnapshot = async (project: ProjectContext): Promise<void> => {
    const data = await loadProjectSnapshotFile(project);
    const { entities } = deserializeSnapshot(data);

    project.entities = entities;

    const fileName = getProjectSnapshotFileName(project);
    logSuccess('Loaded project snapshot', formatFileNameRelativeToProject(project, fileName, true));
};
