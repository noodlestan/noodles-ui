import { readFile } from 'fs/promises';

import { BuildSnapshotDto, ProjectContext } from '@noodles-ui/support-types';

import { deseralizeSnapshot } from './deserializeSnapshot';
import { getProjectSnapshotFileName } from './getProjectSnapshotFileName';

export const loadProjectSnapshotFile = async (
    project: ProjectContext,
): Promise<BuildSnapshotDto> => {
    const file = getProjectSnapshotFileName(project);
    const contents = await readFile(file);
    return deseralizeSnapshot(contents);
};
