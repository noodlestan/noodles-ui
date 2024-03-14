import { readFile } from 'fs/promises';

import { ProjectContext, ProjectSnapshot } from '@noodles-ui/support-types';

import { deseralizeSnapshot } from './deseralizeSnapshot';
import { getProjectSnapshotFileName } from './getProjectSnapshotFileName';

export const loadProjectSnapshotFile = async (
    project: ProjectContext,
): Promise<ProjectSnapshot> => {
    const file = getProjectSnapshotFileName(project);
    const contents = await readFile(file);
    return deseralizeSnapshot(contents);
};
