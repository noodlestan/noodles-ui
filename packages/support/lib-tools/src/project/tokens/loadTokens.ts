import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';

export const loadTokens = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading tokens...');
    // projectResource.tokens.forEach(token => {
    //   const context = newPublicItemContext(token);
    //   loadToken(project, context); => addToken()
    // });
    if (project && projectResource) {
        console.info('');
    }
};
