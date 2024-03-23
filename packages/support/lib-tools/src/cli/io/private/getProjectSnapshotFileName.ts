import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_FOLDER, NUI_SNAPSHOT_FILE } from '../../../project/resources/constants';

export const getProjectSnapshotFileName = (project: ProjectContext): string => {
    return join(project.projectPath, NUI_RESOURCES_FOLDER, NUI_SNAPSHOT_FILE);
};
