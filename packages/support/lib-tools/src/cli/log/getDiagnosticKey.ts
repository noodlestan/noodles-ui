import {
    ProjectContext,
    ProjectDiagnosticSource,
    UnknownResource,
    fileErrorFromDiagnosticSource,
} from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../../project/resources/getters/getResourceTypedKey';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';

export const getDiagnosticKey = (
    project: ProjectContext,
    source: ProjectDiagnosticSource,
): string => {
    if (typeof source === 'string') {
        return formatFileNameRelativeToProject(project, source);
    }
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        return formatFileNameRelativeToProject(project, fileError.fileName);
    }
    return getResourceTypedKey(source as UnknownResource);
};
