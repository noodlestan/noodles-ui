import {
    ProjectContext,
    ProjectDiagnosticSource,
    UnknownResource,
} from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../../project/resources/getResourceTypedKey';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';

import { fileErrorFromDiagnosticSource } from './fileErrorFromDiagnosticSource';

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
