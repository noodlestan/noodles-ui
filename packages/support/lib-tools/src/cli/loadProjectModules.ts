import { readFile } from 'fs/promises';
import { join } from 'path';

import { NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE } from '../resources/constants';
import { ProgramModuleContext } from '../types/program';
import { ProjectContext } from '../types/projects';

import { formatFileName } from './formatFileName';
import { logSuccess } from './logSuccess';

export const loadProjectModules = async (project: ProjectContext): Promise<void> => {
    const modules = project.build.modules;
    const file = join(project.projectPath, NUI_CACHE_FOLDER, NUI_MODULES_CACHE_FILE);

    const contents = await readFile(file);
    const data = JSON.parse(contents.toString()) as { [key: string]: ProgramModuleContext };

    modules.clear();
    const entries = Array.from(Object.entries(data));
    entries.forEach(([key, value]) => {
        modules.set(key, value);
    });

    logSuccess('loaded source cache', formatFileName(modules, file, true));
};
