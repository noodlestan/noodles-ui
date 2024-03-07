import { ProjectResource } from '@noodles-ui/core-types';

import { logMessage } from '../../cli/logger/logMessage';
import { ProjectContext } from '../../types/projects';

export const loadTokens = (project: ProjectContext, projectResource: ProjectResource): void => {
    // projectResource.tokens.forEach(token => {
    //   const context = newPublicItemContext(token);
    //   loadToken(project, context); => addToken()
    // });
    if (project && projectResource) {
        logMessage('! no tokens loaded');
    }
};
