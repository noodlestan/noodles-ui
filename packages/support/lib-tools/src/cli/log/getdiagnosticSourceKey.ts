import { getResourceTypedKey } from '../../project/resources/getResourceTypedKey';
import { ProjectContext, ProjectDiagnosticSource } from '../../types/projects';
import { UnknownResource } from '../../types/resources';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';

import { fileErrorFromDiagnosticSource } from './fileErrorFromDiagnosticSource';

export const getdiagnosticSourceKey = (
    project: ProjectContext,
    source: ProjectDiagnosticSource,
): string => {
    if (typeof source === 'string') {
        return formatFileNameRelativeToProject(project.build.modules, source);
    }
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        return formatFileNameRelativeToProject(project.build.modules, fileError.fileName);
    }
    return getResourceTypedKey(source as UnknownResource);
};
