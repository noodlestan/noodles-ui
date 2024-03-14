import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';

export const loadTokens = (project: ProjectContext, projectResource: ProjectResource): void => {
    // projectResource.tokens.forEach(token => {
    //   const context = newPublicItemContext(token);
    //   loadToken(project, context); => addToken()
    // });
    if (project && projectResource) {
        logMessage('! no tokens loaded');
    }
};
