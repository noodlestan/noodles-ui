import { ProjectContext } from '@noodles-ui/support-types';

import { safeName } from '../../../util/string';

export const systemComponentName = (project: ProjectContext): string => {
    return safeName(project.entities.project.name || 'NUI') + 'Root';
};
