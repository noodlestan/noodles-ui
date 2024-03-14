import { ProjectContext } from '@noodles-ui/support-types';
import { green } from 'kleur';

import { logMessage } from '../logger/logMessage';

export const logProjectBasicInfo = (project: ProjectContext): void => {
    if (project.rootPath) {
        logMessage(green('<root>'), project.rootPath);
    }
    logMessage(green('<project>'), project.projectPath);

    console.info('');
};
