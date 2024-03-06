import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

export const loadTokens = (project: ProjectContext, projectResource: ProjectResource): void => {
    // projectResource.tokens.forEach(token => {
    //   const context = newPublicItemContext(token);
    //   loadToken(project, context); => addToken()
    // });
    if (project && projectResource) {
        console.info('');
    }
};
