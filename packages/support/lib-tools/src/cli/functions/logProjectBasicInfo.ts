import { green } from 'kleur';

import { ProjectContext } from '../../types/projects';

import { logMessage } from './logMessage';

export const logProjectBasicInfo = (project: ProjectContext): void => {
    if (project.rootPath) {
        logMessage(green('<root>'), project.rootPath);
    }
    logMessage(green('<project>'), project.projectPath);

    console.info('');
};
