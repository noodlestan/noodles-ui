import { ProjectEntities } from '../../compiler';
import { ProjectBuildContext } from '../types';

export const getProject = (context?: ProjectEntities): ProjectBuildContext =>
    context?.entities.project.get('') as ProjectBuildContext;
