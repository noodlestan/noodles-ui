import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

export const getPublicComponents = (project: ProjectContext): ComponentBuildContext[] => {
    return Array.from(project.entities.component.values()).filter(item => item.context.public);
};
