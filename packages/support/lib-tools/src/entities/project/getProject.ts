import { ProjectBuildContext, ProjectEntities } from '@noodles-ui/support-types';

export const getProject = (project: ProjectEntities): ProjectBuildContext => {
    return project.entities.project.get('') as ProjectBuildContext;
};
