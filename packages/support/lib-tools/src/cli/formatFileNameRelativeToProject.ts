import { relative } from 'path';

import { gray, green } from 'kleur';

import { PROJECT_MODULE_KEY } from '../project/constants';
import { ProgramModuleContext } from '../types/program';

export const formatFileNameRelativeToProject = (
    modules: Map<string, ProgramModuleContext>,
    fileName: string,
    colors: boolean = false,
): string => {
    const projectPath = modules.get(PROJECT_MODULE_KEY);
    const basePath = projectPath?.path as string;
    const relativeFileName = relative(basePath, fileName);

    const matches = Array.from(modules.values())
        .filter(module => {
            return fileName !== module.path && fileName.startsWith(module.path);
        })
        .sort((a, b) => b.path.length - a.path.length);

    if (matches.length) {
        const module = matches[0];
        if (colors) {
            return gray().bold(matches[0].name) + ' ' + green(relativeFileName);
        }
        return module.name + ' ' + relativeFileName;
    }
    return relativeFileName;
};
