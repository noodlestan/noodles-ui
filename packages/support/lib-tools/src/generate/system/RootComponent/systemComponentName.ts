import { ProjectContext } from '@noodles-ui/support-types';

export const systemComponentName = (project: ProjectContext): string => {
    return (project.resource?.name || 'NUI').replace(' ', '_') + 'Root';
};
