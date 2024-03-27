import { ProjectContext } from '@noodles-ui/support-types';
import { gray, white } from 'kleur';

import { stripFilename } from './stripFilename';

export const formatFileName = (
    project: ProjectContext,
    fileName: string,
    colors: boolean = false,
): string => {
    const { modules } = project.build;
    const matches = Array.from(modules.values())
        .filter(module => {
            return fileName !== module.path && fileName.startsWith(module.path);
        })
        .sort((a, b) => b.path.length - a.path.length);
    if (matches.length) {
        const module = matches[0];
        const stripped = stripFilename(fileName, module.path, '').substring(1);
        if (colors) {
            return gray().bold(matches[0].name) + '/' + white().bold(stripped);
        }
        return module.name + '/' + stripped;
    }
    return fileName;
};
