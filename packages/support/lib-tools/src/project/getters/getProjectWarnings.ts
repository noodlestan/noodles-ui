import { ProjectContext, ProjectDiagnostic } from '@noodles-ui/support-types';

export const getProjectWarnings = (project: ProjectContext): ProjectDiagnostic[] => {
    return project.diagnostics.filter(item => item.severity === 'warning');
};
