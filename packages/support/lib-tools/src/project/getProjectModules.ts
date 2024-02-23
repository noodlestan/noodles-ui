import { dirname } from 'path';

import { logMessage } from '../cli/logMessage';
import { isResourceFile } from '../resources/isResourceFile';
import { ProgramModuleContext } from '../types/program';
import { ProjectContext } from '../types/projects';

export const getProjectModules = (project: ProjectContext): Map<string, ProgramModuleContext> => {
    const { build } = project;
    const files = build.program.getSourceFiles();

    //     .filter(file => compiled.isSourceFileDefaultLibrary(file))
    //     .filter(file => !compiled.isSourceFileFromExternalLibrary(file))
    //     .filter(file => compiled.isSourceFileFromExternalLibrary(file))

    const map: Map<string, ProgramModuleContext> = new Map();
    map.set('.', {
        name: '<entry>',
        path: '.',
        filenames: [],
    });

    files
        .filter(file => isResourceFile(file.fileName))
        .forEach(file => {
            logMessage('module', file.fileName);

            let module;

            if (dirname(file.fileName) === project.projectFile) {
                module = map.get('.');
            } else if (project.rootPath && file.fileName.startsWith(project.rootPath)) {
                const relativePath = dirname(file.fileName).replace(project.rootPath, '.');
                module = map.get(relativePath);
                if (!module) {
                    module = {
                        name: relativePath,
                        path: relativePath,
                        filenames: [],
                    };
                    map.set(relativePath, module);
                }
            }

            if (module) {
                module?.filenames.push(file.fileName);
            }
        });

    // modules.forEach(m => logMessage('module', m));

    return map;
};
