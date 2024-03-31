import { ProjectBuildContext, ProjectEntities } from '../project-entities';

export const getProject = (context?: ProjectEntities): ProjectBuildContext =>
    context?.entities.project.get('') as ProjectBuildContext;
