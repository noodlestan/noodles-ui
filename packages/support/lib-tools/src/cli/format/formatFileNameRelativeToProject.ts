import { relative } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { gray, white } from 'kleur';

export const formatFileNameRelativeToProject = (
    compiler: CompilerContext,
    fileName: string,
    colors: boolean = false,
): string => {
    const { modules } = compiler.build;
    const projectPath = compiler.projectPath;
    const relativeFileName = relative(projectPath, fileName);

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
