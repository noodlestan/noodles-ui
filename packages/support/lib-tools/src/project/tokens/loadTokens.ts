import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';

export const loadTokens = (project: ProjectContext, resource: ProjectResource): void => {
    // const { tokens } = resource.entities;
    //   tokens.forEach(token => {
    //   const context = newPublicItemContext(token);
    //   loadToken(project, context); => addToken()
    // });
    if (project && resource) {
        logMessage('! no tokens loaded');
    }
};
