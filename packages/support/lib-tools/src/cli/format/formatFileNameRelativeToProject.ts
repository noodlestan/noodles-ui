import { relative } from 'path';

import { PROJECT_MODULE_KEY } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';
import { gray, white } from 'kleur';

export const formatFileNameRelativeToProject = (
    compiler: CompilerContext,
    fileName: string,
    colors: boolean = false,
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
        if (colors) {
            return gray().bold(matches[0].name) + ' ' + white().bold(relativeFileName);
        }
        return module.name + ' ' + relativeFileName;
    }
    return relativeFileName;
};
