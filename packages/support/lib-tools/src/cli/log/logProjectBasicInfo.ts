import { ProjectContext } from '@noodles-ui/support-types';
import { gray, green } from 'kleur';

import { logMessage } from '../logger/logMessage';

export const logProjectBasicInfo = (project: ProjectContext): void => {
    if (project.rootPath) {
        logMessage(green('<root>'), project.rootPath);
    }
    logMessage(green('<project>'), project.projectPath);

    if (project.interactive.expand.length) {
        logMessage(gray('expand:'), project.interactive.expand);
    }

    if (!project.interactive.hints && !project.interactive.expand.length) {
        console.info('');
        logMessage(gray('  use "--hints" to know which details can be expanded'));
    }

    console.info('');
};
