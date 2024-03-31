import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    ProjectDiagnosticSource,
    fileErrorFromDiagnosticSource,
} from '@noodles-ui/core-diagnostics';
import { UnknownResource, getResourceTypedKey } from '@noodles-ui/core-resources';

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
