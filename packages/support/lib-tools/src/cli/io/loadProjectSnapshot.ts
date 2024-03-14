import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { loadProjectSnapshotFile } from './private/loadProjectSnapshotFile';

export const loadProjectSnapshot = async (project: ProjectContext): Promise<void> => {
    const { surfaces, themes, components, variants, tokens } =
        await loadProjectSnapshotFile(project);

    project.surfaces = surfaces;
    project.themes = themes;
    project.components = components;
    project.variants = variants;
    project.tokens = tokens;

    const fileName = getProjectSnapshotFileName(project);
    logSuccess('Loaded project snapshot', formatFileNameRelativeToProject(project, fileName, true));
};
