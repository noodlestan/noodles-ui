import { writeFile } from 'fs/promises';
import { join } from 'path';

import { NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE } from '../resources/constants';
import { ProgramModuleContext } from '../types/program';
import { ProjectContext } from '../types/projects';

import { formatFileName } from './formatFileName';
import { logSuccess } from './logSuccess';

export const saveProjectModules = async (project: ProjectContext): Promise<void> => {
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

    logSuccess('updated source cache', formatFileName(modules, file, true));
};
