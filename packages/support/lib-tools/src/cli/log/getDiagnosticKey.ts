import {
    CompilerContext,
    ProjectDiagnosticSource,
    UnknownResource,
    fileErrorFromDiagnosticSource,
} from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../../compiler/resources/getters/getResourceTypedKey';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';

export const getDiagnosticKey = (
    compiler: CompilerContext,
    source: ProjectDiagnosticSource,
): string => {
    if (typeof source === 'string') {
        return formatFileNameRelativeToProject(compiler, source);
    }
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        return formatFileNameRelativeToProject(compiler, fileError.fileName);
    }
    return getResourceTypedKey(source as UnknownResource);
};
