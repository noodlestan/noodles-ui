import { ProjectContext, ProjectDiagnostic } from '@noodles-ui/support-types';

export const getProjectErrors = (project: ProjectContext): ProjectDiagnostic[] => {
    return project.diagnostics.filter(item => item.severity === 'error');
};
