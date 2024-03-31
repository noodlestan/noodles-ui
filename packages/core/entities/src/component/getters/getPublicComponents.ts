import { ComponentBuildContext, ProjectEntities } from '../../project-entities';

export const getPublicComponents = (project: ProjectEntities): ComponentBuildContext[] => {
    return Array.from(project.entities.component.values()).filter(item => item.context.public);
};
