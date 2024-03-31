import { relative } from 'path';

import { PROJECT_MODULE_KEY } from '@noodles-ui/core-types';

import { CompilerContext } from '../projects';

export const formatFileNameRelativeToProject = (
    compiler: CompilerContext,
    fileName: string,
): string => {
    const { modules } = compiler.build;
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
        return module.name + ' ' + relativeFileName;
    }
    return relativeFileName;
};
