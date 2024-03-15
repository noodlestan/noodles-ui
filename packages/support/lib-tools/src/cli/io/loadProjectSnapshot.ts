import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { loadProjectSnapshotFile } from './private/loadProjectSnapshotFile';

export const loadProjectSnapshot = async (project: ProjectContext): Promise<void> => {
    const snapshotDto = await loadProjectSnapshotFile(project);
    const { surface, theme, component, variant, token } = snapshotDto.entities;

    project.entities.surface = new Map(Object.entries(surface));
    project.entities.theme = new Map(Object.entries(theme));
    project.entities.component = new Map(Object.entries(component));
    project.entities.variant = new Map(Object.entries(variant));
    project.entities.token = new Map(Object.entries(token));

    const fileName = getProjectSnapshotFileName(project);
    logSuccess('Loaded project snapshot', formatFileNameRelativeToProject(project, fileName, true));
};
