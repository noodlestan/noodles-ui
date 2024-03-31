import { BuildSnapshot, ProjectBuildContext } from '@noodles-ui/support-types';

export const project = (snapshot?: BuildSnapshot): ProjectBuildContext =>
    snapshot?.entities.project.get('') as ProjectBuildContext;
