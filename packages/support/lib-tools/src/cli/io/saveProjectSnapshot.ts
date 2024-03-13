import { writeFile } from 'fs/promises';

import { ProjectContext } from '../../types/projects';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { serializeSnapshot } from './private/serializeSnapshot';

export const saveProjectSnapshot = async (project: ProjectContext): Promise<void> => {
    const data = serializeSnapshot(project);
    const json = JSON.stringify(data);
    const fileName = getProjectSnapshotFileName(project);
    await writeFile(fileName, json);

    logSuccess('Updated snapshot', formatFileNameRelativeToProject(project, fileName, true));
};
