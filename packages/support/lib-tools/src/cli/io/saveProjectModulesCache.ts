import { writeFile } from 'fs/promises';
import { join } from 'path';

import { NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE } from '../../project/resources/constants';
import { ProgramModuleContext } from '../../types/program';
import { ProjectContext } from '../../types/projects';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveProjectModulesCache = async (project: ProjectContext): Promise<void> => {
    const modules = project.build.modules;

    const data = Array.from(modules.entries()).reduce(
        (acc, [key, value]) => {
            acc[key] = value;
            return acc;
        },
        {} as { [key: string]: ProgramModuleContext },
    );

    const json = JSON.stringify(data);
    const file = join(project.projectPath, NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE);
    await writeFile(file, json);

    logSuccess('Updated modules cache', formatFileNameRelativeToProject(modules, file, true));
};
