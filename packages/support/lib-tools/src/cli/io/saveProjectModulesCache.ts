import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getModulesCacheFileName } from './private/getModulesCacheFileName';

export const saveProjectModulesCache = async (project: ProjectContext): Promise<void> => {
    const modules = project.build.modules;
    const data = Object.fromEntries(modules);
    const json = JSON.stringify(data);
    const fileName = getModulesCacheFileName(project);
    await writeFile(fileName, json);

    logSuccess('Updated modules cache', formatFileNameRelativeToProject(project, fileName, true));
};
